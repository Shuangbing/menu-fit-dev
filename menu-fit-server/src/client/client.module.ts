import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [ClientController],
  imports: [AuthModule]
})
export class ClientModule {}
