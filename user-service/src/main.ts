import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  loadOpenAPI(app);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOST,
      port: process.env.TCP,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}

function loadOpenAPI(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('User-Service')
    .setDescription(
      'This service is responsible for handling user data and user accounts',
    )
    .setVersion('alpha')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/user-service', app, document);
}

bootstrap();
