import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UpdatePostRequest } from './dto/update-post-request.dto';
import { PostCreatedEvent } from './events/post-created.event';
import { PostUpdatedEvent } from './events/post-updated.event';

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

    updatePost({ text, hearts, userName  }: UpdatePostRequest) {
        this.postingClient.emit('update_post', new PostUpdatedEvent(text, hearts, userName));
    }

    deletePost(postId: string) {
        this.postingClient.emit('delete_post', postId);
    }
}
