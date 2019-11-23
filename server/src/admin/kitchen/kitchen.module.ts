import { Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Order } from '../../models/order.model';

@Module({
  imports: [TypegooseModule.forFeature([Order])],
  controllers: [KitchenController],
})
export class KitchenModule {}
