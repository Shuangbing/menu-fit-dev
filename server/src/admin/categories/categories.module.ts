import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Category } from '../../models/category.model';

@Module({
  imports: [TypegooseModule.forFeature([Category])],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
