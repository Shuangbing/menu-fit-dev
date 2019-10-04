import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  mongoose.connect('mongodb://localhost/menu-fit-db', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, transform: true }));

  const options = new DocumentBuilder()
    .setTitle('Menu.Fit Server API')
    .setDescription('Menu.Fit Server API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
