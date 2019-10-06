import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [AdminModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
