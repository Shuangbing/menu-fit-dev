import {
  Controller,
  UseGuards,
  Get,
  Param,
  HttpException,
  NotFoundException,
  Query,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { PaymentService } from './payment.service';
import { IsNotEmpty } from 'class-validator';

class PaymentConfirm {
  @ApiModelProperty({ description: '注文ID', example: '123456789' })
  @IsNotEmpty({ message: '注文IDを入力してください' })
  orderId: string;
  @ApiModelProperty({ description: '決済ID', example: '123456789' })
  transactionId: string;
}

@Controller('client/payment')
@ApiUseTags('client-支払い')
@UseGuards(AuthGuard('client'))
export class PaymentController {
  constructor(
    @InjectModel(User) private readonly userModel,
    @InjectModel(Order) private readonly orderModel,
    @InjectModel(Table) private readonly tableModel,
    @InjectModel(Menu) private readonly menuModel,
    @InjectModel(Category) private readonly categoryModel,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('line-pay/confirm')
  @ApiOperation({ title: 'LINE_PAYの支払い確認' })
  async line_pay_confirm(
    @Req() request: any,
    @Body() paymentConfirm: PaymentConfirm,
  ) {
    const order = await this.orderModel.findOne({
      _id: paymentConfirm.orderId,
      user: request.user._id,
    });

    switch (order.payment) {
      case 'line-pay':
        const payment = await this.paymentService.LINE_PAY_CONFIRM(
          order.total,
          paymentConfirm.transactionId,
        );
        const orderUpdate = await this.orderModel.findOneAndUpdate(
          { _id: paymentConfirm.orderId, user: request.user._id },
          {
            status: 1,
            transactionId: paymentConfirm.transactionId,
          },
        );
        if (orderUpdate) {
          return payment;
        } else {
          throw new HttpException('注文情報の更新ができませんでした', 403);
        }
      case 'cash':
        return {
          payment: 'cash',
          status: order.status,
        };
      default:
        break;
    }
  }

  @Get('line-pay/:id')
  @ApiOperation({ title: 'LINE_PAYで支払う' })
  async line_pay(@Req() request: any, @Param('id') id: string) {
    const order = await this.orderModel.findOne({
      _id: id,
      user: request.user._id,
    });
    if (order.status !== 0) {
      throw new HttpException('注文状態が正しくありません', 403);
    }
    const payment = await this.paymentService.LINE_PAY_APPLY(
      order._id,
      order.total,
    );
    const orderUpdate = await this.orderModel.findOneAndUpdate(
      { _id: id, user: request.user._id },
      { payment: 'line-pay' },
    );
    if (orderUpdate) {
      return {
        payment: 'line-pay',
        total: orderUpdate.total,
        paymentDetail: payment,
      };
    } else {
      throw new HttpException('注文情報の更新ができませんでした', 403);
    }
  }

  @Get('cash/:id')
  @ApiOperation({ title: '現金で支払う' })
  async cash_pay(@Req() request: any, @Param('id') id: string) {
    const order = await this.orderModel.findOne({
      _id: id,
      user: request.user._id,
    });
    if (order.status !== 0) {
      throw new HttpException('注文状態が正しくありません', 403);
    }
    const orderUpdate = await this.orderModel.findOneAndUpdate(
      { _id: id, user: request.user._id },
      { payment: 'cash' },
    );
    if (orderUpdate) {
      return {
        payment: 'cash',
        total: orderUpdate.total,
      };
    } else {
      throw new HttpException('注文情報の更新ができませんでした', 403);
    }
  }
}
