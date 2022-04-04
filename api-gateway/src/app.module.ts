import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostGatewayModule } from './post-gateway/post-gateway.module';
import { UserGatewayModule } from './user-gateway/user-gateway.module';
import { AdminGatewayModule } from './admin-gateway/admin-gateway.module';

@Module({
  imports: [
    PostGatewayModule,
    UserGatewayModule,
    AdminGatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
