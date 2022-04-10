import { Module } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { UserGatewayController } from './user-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'user-consumer',
          }
        }
      }
    ]),
  ],
  providers: [UserGatewayService],
  controllers: [UserGatewayController]
})
export class UserGatewayModule {}
