import { Module } from '@nestjs/common';
import { AdminGatewayService } from './admin-gateway.service';
import { AdminGatewayController } from './admin-gateway.controller';

@Module({
  providers: [AdminGatewayService],
  controllers: [AdminGatewayController]
})
export class AdminGatewayModule {}
