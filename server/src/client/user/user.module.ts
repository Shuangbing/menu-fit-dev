import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassportModule } from '@nestjs/passport';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';

@Module({
  imports: [TypegooseModule.forFeature([User, Order]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
})
export class UserModule { }
