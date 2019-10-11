import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';

@Controller('admin/orders')
export class OrdersController {
    constructor(
        @InjectModel(Order) private readonly orderModel,
    ) {}
}
