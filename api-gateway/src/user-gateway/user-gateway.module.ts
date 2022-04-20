import { Module } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { UserGatewayController } from './user-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserDataGatewayService } from './services/user-data-gateway.service';
import { UserFollowGatewayService } from './services/user-follow-gateway.service';
import { UserMentionsGatewayService } from './services/user-mentions-gateway.service';
import { UserLogGatewayService } from './services/user-log-gateway.service';
import { UserDataGatewayController } from './controllers/user-data-gateway.controller';
import { UserFollowGatewayController } from './controllers/user-follow-gateway.controller';
import { UserMentionsGatewayController } from './controllers/user-mentions-gateway.controller';
import { UserLogGatewayController } from './controllers/user-log-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
  ],
  providers: [
    UserGatewayService,
    UserDataGatewayService,
    UserFollowGatewayService,
    UserMentionsGatewayService,
    UserLogGatewayService,
  ],
  controllers: [
    UserGatewayController,
    UserDataGatewayController,
    UserFollowGatewayController,
    UserMentionsGatewayController,
    UserLogGatewayController,
  ],
})
export class UserGatewayModule {}
