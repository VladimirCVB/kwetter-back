import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserFollowRequest } from '../dto/create-user-follow-request.dto';
import { UserFollowCreatedEvent } from '../events/user-follow-created.event';

@Injectable()
export class UserFollowGatewayService {
    constructor(
        @Inject('USER_SERVICE') private readonly userLogClient: ClientKafka,
    ) { }

    getUserFollow(userId: string) {
        this.userLogClient.emit('get_user_follow_by_id', userId);
    }

    createUserFollow({ userId, userFollowed, userFollowing }: CreateUserFollowRequest) {
        this.userLogClient.emit('user_follow_created', new UserFollowCreatedEvent(userId, userFollowed, userFollowing));
    }

    updateUserFollow({ userId, userFollowed, userFollowing }: CreateUserFollowRequest) {
        this.userLogClient.emit('update_user_follow', new UserFollowCreatedEvent(userId, userFollowed, userFollowing));
    }

    deleteUserFollow(userId: string) {
        this.userLogClient.emit('delete_user_follow', userId);
    }
}
