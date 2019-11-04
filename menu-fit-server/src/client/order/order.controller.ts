import { Controller, Get, Param, HttpException, UseGuards, Post, Body, Req } from '@nestjs/common';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { mongoose } from '@typegoose/typegoose';
import { Order } from '../../models/order.model';
import { AuthGuard } from '@nestjs/passport';

class CreateOrderDto {
    total: number;
    detail: [OrderDetail];
}

class OrderDetail {
    @ApiModelProperty({ description: 'メニューID' })
    @IsNotEmpty({ message: 'メニューIDを入力してください' })
    menu: string;
    @ApiModelProperty({ description: 'メニュー数量' })
    @IsNotEmpty({ message: '数量を入力してください' })
    amount: number;
    total: number;
}

@Controller('client/order')
@ApiUseTags('client-注文')
@UseGuards(AuthGuard())
export class OrderController {
    public restrantName = process.env.RESTRANT_NAME;

    constructor(
        @InjectModel(User) private readonly userModel,
        @InjectModel(Order) private readonly orderModel,
        @InjectModel(Table) private readonly tableModel,
        @InjectModel(Menu) private readonly menuModel,
        @InjectModel(Category) private readonly categoryModel,
    ) { }

    @Get(':id')
    @ApiOperation({ title: 'テーブルを指定しメニューを表示する' })
    async menu(@Param('id') id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) { throw new HttpException('正しいIDを指定してください', 403); }
        const table = await this.tableModel.findById(id);
        if (!table) { throw new HttpException('テーブルが見つかりませんでした', 403); }
        const menu = await this.menuModel.find();
        if (!menu) { throw new HttpException('メニューがありません', 403); }
        const category = await this.categoryModel.aggregate().project({ name: '$_id', label: '$title' }).exec();

        return {
            restrant_name: this.restrantName,
            table_no: table.tableNo,
            categories: category,
            menu: menu,
        };
    }

    @Post(':id')
    @ApiOperation({ title: '選択したメニューを注文する' })
    async confirm(@Req() request, @Param('id') tableId: string, @Body() createOrderDto: CreateOrderDto) {
        if (!this.tableModel.findById(tableId)) { throw new HttpException('テーブルを確認してください', 403); }
        if (createOrderDto.detail.length < 1) { throw new HttpException('注文内容を確認してください', 403); }
        createOrderDto.total = 0;
        for (const element of createOrderDto.detail) {
            const menu = await this.menuModel.findById(element.menu);
            if (element.amount < 1) {
                throw new HttpException('注文情報正しくありません', 403);
            }
            if (menu) {
                element.total = (element.amount * menu.price);
                createOrderDto.total += element.total;
            } else {
                throw new HttpException('メニューが見つかりません', 403);
            }
        }
        const order = await this.orderModel.create({
            user: request.user._id,
            table: tableId,
            total: createOrderDto.total,
            payment: 'cash',
            status: 0,
            detail: createOrderDto.detail,
        });
        return {
            orderID: order._id,
        };
    }

    @Get('detail/:id')
    @ApiOperation({ title: '指定注文の詳細を表示する' })
    async detail(@Param('id') id: string) {
        const order = await this.orderModel.findById(id)
        .populate('table')
        .populate({
            path: 'detail.menu',
            model: 'Menu',
        });

        if (!order) { throw new HttpException('注文が見つかりませんでした', 403); }
        return {
            order: order,
        };
    }
}
