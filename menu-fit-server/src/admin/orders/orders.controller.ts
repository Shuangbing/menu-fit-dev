import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@Controller('admin/orders')
@ApiUseTags('注文')
export class OrdersController {
    constructor(
        @InjectModel(Order) private readonly orderModel,
    ) { }

    @Get()
    @ApiOperation({ title: '注文リストを表示する' })
    async index() {
        return await this.orderModel.find()
            .populate('user')
            .populate('table')
            .populate({
                path: 'detail.menu',
                model: 'Menu',
            });
    }
}
