import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Menu } from '../../models/menu.model';
import { Category } from '../../models/category.model';

@Module({
  imports: [TypegooseModule.forFeature([Menu, Category])],
  controllers: [MenusController],
})
export class MenusModule {}
