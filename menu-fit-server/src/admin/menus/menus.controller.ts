import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { MenuModel, Menu } from './menu.model';
import { IsNotEmpty, IsNotIn } from 'class-validator';

class CreateMenuDto {
    @ApiModelProperty({ description: 'メニューのタイトル', example: 'Food 1' })
    @IsNotEmpty({ message: 'タイトルを入力してください' })
    title: string;
    @ApiModelProperty({ description: 'メニューの値段', example: 1000 })
    @IsNotEmpty({ message: '金額を入力してください' })
    price: number;
    @ApiModelProperty({ description: 'メニューのオプション', example: { title: 'Option1', price: 100 } })
    option: [MenuOption];
}

class MenuOption {
    @ApiModelProperty({ description: 'オプションのタイトル' })
    @IsNotEmpty({ message: 'タイトルを入力してください' })
    title: string;
    @ApiModelProperty({ description: 'オプションの値段' })
    @IsNotEmpty({ message: '金額を入力してください' })
    price: number;
}

@Controller('admin/menus')
@ApiUseTags('メニュー')
export class MenusController {
    @Get()
    @ApiOperation({ title: 'メニューリストを表示する' })
    async index() {
        return await MenuModel.find();
    }

    @Post()
    @ApiOperation({ title: 'メニューを追加する' })
    async create(@Body() createMenuDto: CreateMenuDto) {
        await MenuModel.create(createMenuDto);
        return {
            success: true,
        };
    }

    @Get(':id')
    @ApiOperation({ title: '指定のメニューの情報を表示する' })
    async detail(@Param('id') id: string) {
        return await MenuModel.findById(id);
    }

    @Put(':id')
    @ApiOperation({ title: '指定のメニューの情報を更新する' })
    async update(@Param('id') id: string, @Body() updateMenuDto: CreateMenuDto) {
        await MenuModel.findByIdAndUpdate(id, updateMenuDto);
        return {
            success: true,
        };
    }

    @Delete(':id')
    @ApiOperation({ title: '指定のメニューの情報を削除する' })
    delete(@Param('id') id: string) {
        return {
            success: true,
        };
    }

}
