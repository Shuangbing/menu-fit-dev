import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';

@Module({
  imports: [TypegooseModule.forFeature([Order])],
  controllers: [OrdersController],
})
export class OrdersModule {}
