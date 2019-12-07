import { Controller, UseGuards, Get, Request, Req, Put, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { Allergy } from '../../models/allergy.model';

class AllergyDto {
    allergies: [];
}

@Controller('client/user')
@ApiUseTags('client-ユーザ')
@UseGuards(AuthGuard('client'))
export class UserController {

    constructor(
        @InjectModel(User) private readonly userModel,
        @InjectModel(Order) private readonly orderModel,
        @InjectModel(Allergy) private readonly allergyModel,
    ) { }

    @Get()
    async index(@Request() req: any) {
        return {
            uid: req.user._id,
            name: req.user.profile.name,
            avatar: req.user.profile.picture,
            allergies: req.user.allergies,
            allergiesArray: await this.allergyModel.aggregate().project({ value: '$_id', text: '$title' }),
        };
    }

    @Get('order')
    async order(@Request() req: any) {
        const orders = await this.orderModel
            .find({ user: req.user._id })
            .populate('table')
            .sort('-createdAt');
        return {
            orders: orders,
        };
    }

    @Get('allergy')
    async allergyList() {
        return {
            allergies: await this.allergyModel.aggregate().project({ value: '$_id', text: '$title' }),
        };
    }

    @Put('allergy')
    async allergy(@Request() req: any, @Body() allergyDto: AllergyDto) {

        const user = await this.userModel.findByIdAndUpdate(req.user._id, {
            allergies: allergyDto.allergies,
        });

        return {
            status: true,
            allergies: allergyDto.allergies,
        };
    }
}
