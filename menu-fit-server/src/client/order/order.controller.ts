import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { TableModel } from '../../admin/tables/table.model';
import { MenuModel } from '../../admin/menus/menu.model';
import { UserModel } from 'src/admin/users/user.model';

@Controller('client/order')
@ApiUseTags('client-注文')
export class OrderController {

    @Get(':id')
    @ApiOperation({ title: 'テーブルを指定しメニューを表示する' })
    async detail(@Param('id') id: string) {
        const table = await TableModel.findById(id);
        const user = await UserModel.findById('5d9c40bc04032c062a5bc562');
        const menu = await MenuModel.find();
        let isCreateNewOrder = false;
        let isJoinTable = false;
        if (!table.user) { isCreateNewOrder = true; }
    }

}
