import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { PaymentService } from './payment.service';

@Controller('client/payment')
@ApiUseTags('client-支払い')
@UseGuards(AuthGuard())
export class PaymentController {
    constructor(
        @InjectModel(User) private readonly userModel,
        @InjectModel(Order) private readonly orderModel,
        @InjectModel(Table) private readonly tableModel,
        @InjectModel(Menu) private readonly menuModel,
        @InjectModel(Category) private readonly categoryModel,
        private readonly paymentService: PaymentService,
    ) { }


    @Get('line-pay/:id')
    @ApiOperation({ title: 'LINE_PAYで支払う' })
    async line_pay(@Param('id') id: string) {
        const order = await this.orderModel.findById(id);
        const payment = this.paymentService.LINE_PAY(order._id, order.total);
        return payment;
    }
    
}
