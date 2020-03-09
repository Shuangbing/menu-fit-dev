import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Allergy } from '../../models/allergy.model';
import { IsNotEmpty } from 'class-validator';

class CreateAllergyDto {
  @ApiModelProperty({ description: 'アレルギーのタイトル', example: 'Egg' })
  @IsNotEmpty({ message: 'アレルギーを入力してください' })
  title: string;
}

@Controller('admin/allergies')
@UseGuards(AuthGuard('admin'))
@ApiUseTags('アレルギー')
export class AllergiesController {
  constructor(@InjectModel(Allergy) private readonly allergyModel) {}

  @Get()
  @ApiOperation({ title: 'アレルギーリストを表示する' })
  async index() {
    return await this.allergyModel.find();
  }

  @Post()
  @ApiOperation({ title: 'アレルギーを追加する' })
  async create(@Body() createAllergyDto: CreateAllergyDto) {
    await this.allergyModel.create(createAllergyDto);
    return {
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({ title: '指定のアレルギーの情報を表示する' })
  async detail(@Param('id') id: string) {
    return await this.allergyModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ title: '指定のアレルギーの情報を更新する' })
  async update(
    @Param('id') id: string,
    @Body() updateAllergyDto: CreateAllergyDto,
  ) {
    await this.allergyModel.findByIdAndUpdate(id, updateAllergyDto);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ title: '指定のアレルギーの情報を削除する' })
  async delete(@Param('id') id: string) {
    await this.allergyModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
