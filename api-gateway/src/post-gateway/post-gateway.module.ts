import { Module } from '@nestjs/common';
import { PostGatewayService } from './post-gateway.service';
import { PostGatewayController } from './post-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'posting',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'posting-consumer',
          }
        }
      }
    ]),
  ],
  providers: [PostGatewayService],
  controllers: [PostGatewayController],
})
export class PostGatewayModule {}
