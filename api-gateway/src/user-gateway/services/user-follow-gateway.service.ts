import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserFollowRequest } from '../dto/create-user-follow-request.dto';
import { UserFollowCreatedEvent } from '../events/user-follow-created.event';

@Injectable()
export class UserFollowGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userLogClient: ClientProxy,
  ) {}

  getUserFollow(userId: string) {
    return this.userLogClient.send('get_user_follow_by_id', userId);
  }

  createUserFollow({
    userId,
    userFollowed,
    userFollowing,
  }: CreateUserFollowRequest) {
    return this.userLogClient.send(
      'user_follow_created',
      new UserFollowCreatedEvent(userId, userFollowed, userFollowing),
    );
  }

  updateUserFollow({
    userId,
    userFollowed,
    userFollowing,
  }: CreateUserFollowRequest) {
    return this.userLogClient.send(
      'update_user_follow',
      new UserFollowCreatedEvent(userId, userFollowed, userFollowing),
    );
  }

  deleteUserFollow(userId: string) {
    return this.userLogClient.send('delete_user_follow', userId);
  }
}
