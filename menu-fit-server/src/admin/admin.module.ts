import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MenusModule } from './menus/menus.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AdminController],
  imports: [MenusModule, UsersModule],
})
export class AdminModule {}
