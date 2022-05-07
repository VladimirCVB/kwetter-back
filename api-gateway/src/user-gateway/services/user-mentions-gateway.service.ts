import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserMentionRequest } from '../dto/create-user-mention-request.dto';
import { UserMentionCreatedEvent } from '../events/user-mention-created.event';

@Injectable()
export class UserMentionsGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userLogClient: ClientProxy,
  ) {}

  getUserMention(id: string) {
    return this.userLogClient.send('get_user_mention_by_id', id);
  }

  createUserMention({
    userId,
    userMentions,
    postId,
  }: CreateUserMentionRequest) {
    return this.userLogClient.send(
      'user_mention_created',
      new UserMentionCreatedEvent(userId, userMentions, postId),
    );
  }

  // updateUserMention({ userId, userMentions, postId }: CreateUserMentionRequest, id: string) {
  //     this.userLogClient.send('update_user_mention',{userDataUpdatedEvent: new UserMentionCreatedEvent(userId, userMentions, postId), id: id });
  // }

  deleteUserMention(id: string) {
    return this.userLogClient.send('delete_user_mention', id);
  }
}
