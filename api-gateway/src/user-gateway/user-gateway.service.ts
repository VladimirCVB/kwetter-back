import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly adminClient: ClientProxy,
  ) { }

  getAdmin() {
    return this.adminClient.send('get_all_users', {});
  }
}
