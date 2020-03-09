import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ disableErrorMessages: true, transform: true }),
  );

  const options = new DocumentBuilder()
    .setTitle('Menu.Fit Server API')
    .setDescription('Menu.Fit Server API description')
    .setVersion('1.0')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
