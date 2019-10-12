import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { mongoose } from '@typegoose/typegoose';

@Controller('client/order')
@ApiUseTags('client-注文')
export class OrderController {
    public restrantName = process.env.RESTRANT_NAME;
    
    constructor(
        @InjectModel(User) private readonly userModel,
        @InjectModel(Table) private readonly tableModel,
        @InjectModel(Menu) private readonly menuModel,
        @InjectModel(Category) private readonly categoryModel,
    ) {}

    @Get(':id')
    @ApiOperation({ title: 'テーブルを指定しメニューを表示する' })
    async detail(@Param('id') id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) { throw new HttpException('正しいIDを指定してください', 401); }
        const table = await this.tableModel.findById(id);
        if (!table) { throw new HttpException('テーブルが見つかりませんでした', 403); }
        const user = await this.userModel.findById('5d99f5ac7b4562548795fd62');
        if (!user) { throw new HttpException('ログインしてください', 403); }
        const menu = await this.menuModel.find();
        if (!menu) { throw new HttpException('メニューがありません', 403); }
        const category = await this.categoryModel.aggregate().project({name : '$_id', label: '$title'}).exec();

        return {
            restrant_name: this.restrantName,
            table_no: table.tableNo,
            categories: category,
            menu: menu,
        };
    }

}
