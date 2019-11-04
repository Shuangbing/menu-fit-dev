import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as serveStatic from 'serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as history from 'connect-history-api-fallback';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, transform: true }));

  const options = new DocumentBuilder()
    .setTitle('Menu.Fit Server API')
    .setDescription('Menu.Fit Server API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  app.use('/admin', serveStatic(join(__dirname, '../public/admin')));
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
