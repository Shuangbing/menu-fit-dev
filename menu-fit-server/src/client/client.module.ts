import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  controllers: [ClientController],
  imports: [AuthModule, OrderModule]
})
export class ClientModule {}
