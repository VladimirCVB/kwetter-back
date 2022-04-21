import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Ensure gracefully shutdown of plugins (like db connections)
  app.enableShutdownHooks();

  // CORS for frontend
  app.enableCors();

  // Start the app
  await app.listen(3000);

}
bootstrap();
