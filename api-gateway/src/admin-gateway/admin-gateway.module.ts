import { Module } from '@nestjs/common';
import { AdminGatewayService } from './admin-gateway.service';
import { AdminGatewayController } from './admin-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'admin',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'admin-consumer',
          }
        }
      }
    ]),
  ],
  providers: [AdminGatewayService],
  controllers: [AdminGatewayController]
})
export class AdminGatewayModule {}
