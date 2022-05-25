import { Module } from '@nestjs/common';
import { AdminGatewayService } from './admin-gateway.service';
import { AdminGatewayController } from './admin-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ADMIN_SERVICE_HOST,
          port: 3003,
        },
      },
    ]),
  ],
  providers: [AdminGatewayService],
  controllers: [AdminGatewayController],
})
export class AdminGatewayModule {}
