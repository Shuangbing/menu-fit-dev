import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { Table } from '../../models/table.model';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';
import { Order } from '../../models/order.model';

@Module({
  controllers: [OrderController],
  imports: [TypegooseModule.forFeature([User, Table, Menu, Category, Order])],
})
export class OrderModule {}
