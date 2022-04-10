import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserMentionRequest } from '../dto/create-user-mention-request.dto';
import { UserMentionCreatedEvent } from '../events/user-mention-created.event';

@Injectable()
export class UserMentionsGatewayService {
    constructor(
        @Inject('USER_SERVICE') private readonly userLogClient: ClientKafka,
    ) { }

    getUserMention(userId: string) {
        this.userLogClient.emit('get_user_mention_by_id', userId);
    }

    createUserMention({ userId, userMentions, postId }: CreateUserMentionRequest) {
        this.userLogClient.emit('user_mention_created', new UserMentionCreatedEvent(userId, userMentions, postId));
    }

    updateUserMention({ userId, userMentions, postId }: CreateUserMentionRequest) {
        this.userLogClient.emit('update_user_mention', new UserMentionCreatedEvent(userId, userMentions, postId));
    }

    deleteUserMention(userId: string) {
        this.userLogClient.emit('delete_user_mention', userId);
    }
}
