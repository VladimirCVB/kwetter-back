import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { PostCreatedEvent } from './events/post-created.event';

@Injectable()
export class PostGatewayService {

    constructor(
        @Inject('POSTING_SERVICE') private readonly postingClient: ClientKafka,
    ) { }

    createPost({ userId, userName }: CreatePostRequest) {
        this.postingClient.emit('post_created', new PostCreatedEvent('', userId, userName));
    }

    getPost(userId: string) {
        this.postingClient.emit('get_post', userId);
    }
}
