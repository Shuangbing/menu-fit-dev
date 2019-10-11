import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MenusModule } from './menus/menus.module';
import { UsersModule } from './users/users.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [AdminController],
  imports: [MenusModule, UsersModule, TablesModule, OrdersModule, CategoriesModule],
})
export class AdminModule {}
