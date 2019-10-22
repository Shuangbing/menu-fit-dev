import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { mongoose } from '@typegoose/typegoose';
import { Order } from '../../models/order.model';

class CreateOrderDto {
    detail: [OrderDetail];
}

class OrderDetail {
    @ApiModelProperty({ description: 'メニューID' })
    @IsNotEmpty({ message: 'メニューIDを入力してください' })
    menu: string;
    @ApiModelProperty({ description: 'メニュー数量' })
    @IsNotEmpty({ message: '数量を入力してください' })
    amount: number;
}

@Controller('client/order')
@ApiUseTags('client-注文')
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
    async detail(@Param('id') id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) { throw new HttpException('正しいIDを指定してください', 401); }
        const table = await this.tableModel.findById(id);
        if (!table) { throw new HttpException('テーブルが見つかりませんでした', 403); }
        //const user = await this.userModel.findById('5d99f5ac7b4562548795fd62');
        //if (!user) { throw new HttpException('ログインしてください', 403); }
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
    async confirm(@Param('id') tableId: string, @Body() createOrderDto: CreateOrderDto) {
        let total = 0;
        if (createOrderDto.detail.length < 1) { throw new HttpException('注文内容を確認してください', 401); }
        createOrderDto.detail.forEach(async (element) => {
            const menu = await this.menuModel.findById(element.menu);
            if (menu) {
                total = total + (element.amount * menu.price);
            }
        });
        
        const order = await this.orderModel.create({
            user: null,
            table: tableId,
            amount: total,
            payment: 'cash',
            status: 0,
            detail: createOrderDto.detail,
        });
        return order;
    }
}
