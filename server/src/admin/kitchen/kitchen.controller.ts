import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ApiUseTags, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';

@Controller('admin/kitchen')
@ApiUseTags('キッチン')
export class KitchenController {

    constructor(
        @InjectModel(Order) private readonly orderModel,
    ) { }

    @Get('monitor')
    async index(@Query('key') key: string) {
        if (key !== process.env.KITCHEN_KEY) { throw new HttpException('キッチンモニターのアクセス権限がありません', 401); }
        return await this.orderModel.find({status: 1})
            .populate('user')
            .populate('table')
            .populate({
                path: 'detail.menu',
                model: 'Menu',
            })
            .sort('-createdAt');
    }
    
}
