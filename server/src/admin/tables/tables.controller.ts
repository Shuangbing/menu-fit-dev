import { Controller, Get, Post, Put, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotIn } from 'class-validator';
import { Table } from '../../models/table.model';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';

class CreateTableDto {
    @ApiModelProperty({ description: 'テーブルの番号', example: 'A-1' })
    @IsNotEmpty({ message: 'テーブルの番号' })
    tableNo: string;
}

@Controller('admin/tables')
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('テーブル')
export class TablesController {
    constructor(
        @InjectModel(Table) private readonly tableModel,
    ) {}

    @Get()
    @ApiOperation({ title: 'テーブルリストを表示する' })
    async index() {
        return await this.tableModel.find();
    }

    @Post()
    @ApiOperation({ title: 'テーブルを追加する' })
    async create(@Body() createTableDto: CreateTableDto) {
        await this.tableModel.create(createTableDto);
        return {
            success: true,
        };
    }

    @Get(':id')
    @ApiOperation({ title: 'テーブルの情報を表示する' })
    async detail(@Param('id') id: string) {
        return await this.tableModel.findById(id);
    }

    @Put(':id')
    @ApiOperation({ title: '指定のテーブルの情報を更新する' })
    async update(@Param('id') id: string, @Body() updateTableDto: CreateTableDto) {
        await this.tableModel.findByIdAndUpdate(id, updateTableDto);
        return {
            success: true,
        };
    }

    @Delete(':id')
    @ApiOperation({ title: '指定のテーブルの情報を削除する' })
    async delete(@Param('id') id: string) {
        await this.tableModel.findByIdAndDelete(id);
        return {
            success: true,
        };
    }
}
