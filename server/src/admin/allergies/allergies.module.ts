import { Module } from '@nestjs/common';
import { AllergiesController } from './allergies.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Allergy } from '../../models/allergy.model';

@Module({
  imports: [TypegooseModule.forFeature([Allergy])],
  controllers: [AllergiesController],
})
export class AllergiesModule {}
