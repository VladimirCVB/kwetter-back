import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostGatewayModule } from './post-gateway/post-gateway.module';
import { UserGatewayModule } from './user-gateway/user-gateway.module';
import { AdminGatewayModule } from './admin-gateway/admin-gateway.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';

@Module({
  imports: [
    PostGatewayModule,
    UserGatewayModule,
    AdminGatewayModule,
    AuthModule,
    ConfigModule.forRoot(),
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
