import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('User service API')
    .setDescription('The user service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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

bootstrap();
