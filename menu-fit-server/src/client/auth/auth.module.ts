import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [TypegooseModule.forFeature([User])],
  providers: [AuthService],
})

export class AuthModule {}
