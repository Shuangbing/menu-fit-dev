import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/orders')
@UseGuards(AuthGuard('jwt'))
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
            })
            .sort('-createdAt');
    }
}
