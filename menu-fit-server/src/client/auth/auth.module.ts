import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../../models/user.model';

@Module({
  controllers: [AuthController],
  imports: [TypegooseModule.forFeature([User])],
})
export class AuthModule {}
