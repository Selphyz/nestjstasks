import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const serverConfig: any = config.get('server');
  const options = new DocumentBuilder()
    .setTitle('Api Tareas')
    .setDescription('Description de la API')
    .setVersion('1.0')
    .addTag('tareas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || serverConfig.port;
  await app.listen(PORT);
  logger.log(`Escuchando en el puerto ${PORT}`);
}
bootstrap();
