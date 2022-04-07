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

    createPost({ userId, userName, text, trends }: CreatePostRequest) {
        this.postingClient.emit('post_created', new PostCreatedEvent('', userId, userName, text, trends));
    }

    getAllPosts() {
        this.postingClient.emit('get_all_posts', null);
    }

    getPosts(userIds: string[]) {
        this.postingClient.emit('get_posts_of_users', userIds);
    }

    getPostByUserId(userId: string) {
        this.postingClient.emit('get_posts_by_userId', userId);
    }

    getPostById(id: string) {
        this.postingClient.emit('get_post_by_id', id);
    }

    getPostTrends() {
        this.postingClient.emit('get_post_trends', null);
    }

    updatePost({ id, text, hearts, userName, trends  }: UpdatePostRequest) {
        this.postingClient.emit('update_post', new PostUpdatedEvent(id, text, hearts, userName, trends));
    }

    deletePost(postId: string) {
        this.postingClient.emit('delete_post', postId);
    }
}
