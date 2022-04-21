import { Module } from '@nestjs/common';
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
        transport: Transport.TCP,
        options: {
          port: 3004
        },
      },
    ]),
  ],
  providers: [
    UserDataGatewayService,
    UserFollowGatewayService,
    UserMentionsGatewayService,
    UserLogGatewayService,
  ],
  controllers: [
    UserDataGatewayController,
    UserFollowGatewayController,
    UserMentionsGatewayController,
    UserLogGatewayController,
  ],
})
export class UserGatewayModule {}
