import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { TableModel } from './table.model';

class CreateTableDto {
    @ApiModelProperty({ description: 'テーブルの番号', example: 'A-1' })
    @IsNotEmpty({ message: 'テーブルの番号' })
    tableNo: string;
}

@Controller('admin/tables')
@ApiUseTags('テーブル')
export class TablesController {
    @Get()
    @ApiOperation({ title: 'テーブルリストを表示する' })
    async index() {
        return await TableModel.find();
    }

    @Post()
    @ApiOperation({ title: 'テーブルを追加する' })
    async create(@Body() createTableDto: CreateTableDto) {
        await TableModel.create(createTableDto);
        return {
            success: true,
        };
    }

    @Get(':id')
    @ApiOperation({ title: 'テーブルの情報を表示する' })
    async detail(@Param('id') id: string) {
        return await TableModel.findById(id);
    }

    @Put(':id')
    @ApiOperation({ title: '指定のテーブルの情報を更新する' })
    async update(@Param('id') id: string, @Body() updateTableDto: CreateTableDto) {
        await TableModel.findByIdAndUpdate(id, updateTableDto);
        return {
            success: true,
        };
    }

    @Delete(':id')
    @ApiOperation({ title: '指定のテーブルの情報を削除する' })
    async delete(@Param('id') id: string) {
        await TableModel.findByIdAndDelete(id);
        return {
            success: true,
        };
    }
}
