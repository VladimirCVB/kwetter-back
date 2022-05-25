import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, zip } from 'rxjs';

@Injectable()
export class UserGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userGatewayService: ClientProxy,
    @Inject('POSTING_SERVICE') private readonly postGatewayService: ClientProxy,
  ) {}

  logIn(email: string, password: string) {
    return this.userGatewayService.send('log_user', { email, password });
  }

  getProfileData(userId: string) {
    return zip(
      this.userGatewayService.send('get_user_data_by_id', userId),
      this.userGatewayService.send('get_user_follow_by_id', userId),
      this.postGatewayService.send('get_posts_by_userId', userId),
    ).pipe(
      map(([userData, userFollow, postData]) => ({
        userData,
        userFollow,
        postData,
      })),
    );
  }
}
