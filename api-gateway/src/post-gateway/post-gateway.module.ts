import { Module } from '@nestjs/common';
import { PostGatewayService } from './post-gateway.service';
import { PostGatewayController } from './post-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTING_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001
        },
      },
    ]),
  ],
  providers: [PostGatewayService],
  controllers: [PostGatewayController],
})
export class PostGatewayModule {}
