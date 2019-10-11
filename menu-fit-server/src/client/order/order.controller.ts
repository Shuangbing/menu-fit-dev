import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';

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
        const table = await this.tableModel.findById(id);
        const user = await this.userModel.findById('5d9c40bc04032c062a5bc562');
        const menu = await this.menuModel.find();
        const category = await this.categoryModel.aggregate().project({name : '$_id', label: '$title'}).exec();
        let isCreateNewOrder = false;
        let isJoinTable = false;
        if (!table.user) { isCreateNewOrder = true; }

        return {
            restrant_name: this.restrantName,
            table_no: table.tableNo,
            categories: category,
            menu: menu,
        };
    }

}
