import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import * as serveStatic from 'serve-static';
import { join } from 'path';

async function bootstrap() {

  require('dotenv').config();

  mongoose.connect(process.env.DB_URL, {
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
  app.enableCors();
  app.use('/web', serveStatic(join(__dirname, '../public')));
  await app.listen(3000);
}
bootstrap();
