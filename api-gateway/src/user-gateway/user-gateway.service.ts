import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userGatewayService: ClientProxy,
  ) { }

  logIn(email: string, password: string) {
    return this.userGatewayService.send('log_user', { email, password });
  }
}
