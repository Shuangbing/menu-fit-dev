import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '../../models/category.model';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class CreateCategoryDto {
    @ApiModelProperty({ description: 'カテゴリーのタイトル', example: 'Category 1' })
    @IsNotEmpty({ message: 'タイトルを入力してください' })
    title: string;
}

@Controller('admin/categories')
@UseGuards(AuthGuard('jwt-admin'))
@ApiUseTags('カテゴリー')
export class CategoriesController {
    constructor(
        @InjectModel(Category) private readonly categoryModel,
    ) {}

    @Get()
    @ApiOperation({ title: 'カテゴリーリストを表示する' })
    async index() {
        return await this.categoryModel.find();
    }

    @Post()
    @ApiOperation({ title: 'カテゴリーを追加する' })
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        await this.categoryModel.create(createCategoryDto);
        return {
            success: true,
        };
    }

    @Get(':id')
    @ApiOperation({ title: '指定のカテゴリーの情報を表示する' })
    async detail(@Param('id') id: string) {
        return await this.categoryModel.findById(id);
    }

    @Put(':id')
    @ApiOperation({ title: '指定のカテゴリーの情報を更新する' })
    async update(@Param('id') id: string, @Body() updateCategoryDtoDto: CreateCategoryDto) {
        await this.categoryModel.findByIdAndUpdate(id, updateCategoryDtoDto);
        return {
            success: true,
        };
    }

    @Delete(':id')
    @ApiOperation({ title: '指定のカテゴリーの情報を削除する' })
    async delete(@Param('id') id: string) {
        await this.categoryModel.findByIdAndDelete(id);
        return {
            success: true,
        };
    }
}
