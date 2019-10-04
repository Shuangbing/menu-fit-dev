import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MenusModule } from './menus/menus.module';

@Module({
  controllers: [AdminController],
  imports: [MenusModule],
})
export class AdminModule {}
