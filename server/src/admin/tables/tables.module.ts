import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Table } from '../../models/table.model';

@Module({
  imports: [TypegooseModule.forFeature([Table])],
  controllers: [TablesController],
})
export class TablesModule {}
