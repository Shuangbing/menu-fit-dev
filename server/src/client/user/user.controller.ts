import { Controller, UseGuards, Get, Request, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';

@Controller('client/user')
@ApiUseTags('client-ユーザ')
@UseGuards(AuthGuard())
export class UserController {

    constructor(
        @InjectModel(User) private readonly userModel,
        @InjectModel(Order) private readonly orderModel,
    ) { }

    @Get()
    async index(@Request() req: any) {
        return {
            uid: req.user._id,
            name: req.user.profile.name,
            avatar: req.user.profile.picture,
        };
    }

    @Get('order')
    async order(@Request() req: any) {
        const orders = await this.orderModel
        .find({ user: req.user._id })
        .populate('table');
        return {
            orders: orders,
        }
    }
}
