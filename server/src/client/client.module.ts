import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [ClientController],
  imports: [AuthModule, OrderModule, PaymentModule, UserModule],
})
export class ClientModule {}
