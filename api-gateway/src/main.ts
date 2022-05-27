import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  loadOpenAPI(app);

  // Ensure gracefully shutdown of plugins (like db connections)
  app.enableShutdownHooks();

  // CORS for frontend
  app.enableCors();

  // Start the app
  await app.listen(process.env.PORT);
}

function loadOpenAPI(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription(
      'This service is responsible for intercepting request from the client and forwarding them to the Microservices',
    )
    .setVersion('alpha')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/api-gateway', app, document);
}

bootstrap();
