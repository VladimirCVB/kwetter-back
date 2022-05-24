import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Post service API')
    .setDescription('The post service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.ADMIN_SERVICE_HOST,
      port: process.env.TCP,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}

bootstrap();
