import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { AuthGuard } from '@nestjs/passport';

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
@UseGuards(AuthGuard('jwt-admin'))
@ApiUseTags('メニュー')
export class MenusController {
    constructor(
        @InjectModel(Menu) private readonly menuModel,
        @InjectModel(Category) private readonly categoryModel,
    ) {}

    @Get()
    @ApiOperation({ title: 'メニューリストを表示する' })
    async index() {
        return await this.menuModel.find().populate('category');
    }

    @Post()
    @ApiOperation({ title: 'メニューを追加する' })
    async create(@Body() createMenuDto: CreateMenuDto) {
        await this.menuModel.create(createMenuDto);
        return {
            success: true,
        };
    }

    @Get(':id')
    @ApiOperation({ title: '指定のメニューの情報を表示する' })
    async detail(@Param('id') id: string) {
        return await this.menuModel.findById(id);
    }

    @Put(':id')
    @ApiOperation({ title: '指定のメニューの情報を更新する' })
    async update(@Param('id') id: string, @Body() updateMenuDto: CreateMenuDto) {
        await this.menuModel.findByIdAndUpdate(id, updateMenuDto);
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
