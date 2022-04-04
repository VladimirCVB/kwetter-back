import { Module } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { UserGatewayController } from './user-gateway.controller';

@Module({
  providers: [UserGatewayService],
  controllers: [UserGatewayController]
})
export class UserGatewayModule {}
