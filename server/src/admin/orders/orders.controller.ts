import {
  Controller,
  Get,
  UseGuards,
  Put,
  Param,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/orders')
@UseGuards(AuthGuard('admin'))
@ApiUseTags('注文')
export class OrdersController {
  constructor(@InjectModel(Order) private readonly orderModel) {}

  @Get()
  @ApiOperation({ title: '注文リストを表示する' })
  async index() {
    return await this.orderModel
      .find()
      .populate('user')
      .populate('table')
      .populate({
        path: 'detail.menu',
        model: 'Menu',
      })
      .sort('-createdAt');
  }

  @Put('accounting/:id')
  @ApiOperation({ title: '注文を会計する' })
  async accounting(@Param('id') id: string) {
    const order = await this.orderModel.findByIdAndUpdate(id, { status: 1 });
    if (order) {
      return {
        orderId: id,
        status: 1,
      };
    } else {
      throw new HttpException('会計処理ができませんでした', 403);
    }
  }
}
