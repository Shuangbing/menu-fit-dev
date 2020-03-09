import {
  Controller,
  Get,
  HttpException,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/kitchen')
@ApiUseTags('キッチン')
export class KitchenController {
  constructor(@InjectModel(Order) private readonly orderModel) {}

  @UseGuards(AuthGuard('admin'))
  @Get('authCode')
  async authCode() {
    return {
      authCode: process.env.KITCHEN_KEY,
    };
  }

  @Get('monitor')
  async index(@Query('key') key: string) {
    if (key !== process.env.KITCHEN_KEY) {
      throw new HttpException(
        'キッチンモニターのアクセス権限がありません',
        401,
      );
    }
    return await this.orderModel
      .find({ status: 1 })
      .populate('user')
      .populate('table')
      .populate({
        path: 'detail.menu',
        model: 'Menu',
      })
      .sort('updatedAt');
  }

  @Post('monitor')
  async doneOrder(@Query('key') key: string, @Body() body: any) {
    if (key !== process.env.KITCHEN_KEY) {
      throw new HttpException(
        'キッチンモニターのアクセス権限がありません',
        401,
      );
    }
    await this.orderModel.findByIdAndUpdate(body.orderId, { status: 2 });
    return await this.orderModel
      .find({ status: 1 })
      .populate('user')
      .populate('table')
      .populate({
        path: 'detail.menu',
        model: 'Menu',
      })
      .sort('updatedAt');
  }
}
