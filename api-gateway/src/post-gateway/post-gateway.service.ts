import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostRequest } from './dto/create-post-request.dto';
import { UpdatePostRequest } from './dto/update-post-request.dto';
import { PostCreatedEvent } from './events/post-created.event';
import { PostUpdatedEvent } from './events/post-updated.event';

@Injectable()
export class PostGatewayService {
  constructor(
    @Inject('POSTING_SERVICE') private readonly postingClient: ClientProxy,
  ) {}

  createPost({ userId, userName, text, trends }: CreatePostRequest) {
    return this.postingClient.send(
      'post_created',
      new PostCreatedEvent('', userId, userName, text, trends),
    );
  }

  getAllPosts() {
    return this.postingClient.send('get_all_posts', {});
  }

  getPosts(userIds: string[]) {
    return this.postingClient.send('get_posts_of_users', userIds);
  }

  getPostByUserId(userId: string) {
    return this.postingClient.send({ cmd: 'get_posts_by_userId' }, userId);
  }

  getPostById(id: string) {
    return this.postingClient.send('get_post_by_id', id);
  }

  getPostTrends() {
    return this.postingClient.send('get_post_trends', {});
  }

  updatePost({ id, text, hearts, userName, trends }: UpdatePostRequest) {
    return this.postingClient.send(
      'update_post',
      new PostUpdatedEvent(id, text, hearts, userName, trends),
    );
  }

  deletePost(postId: string) {
    return this.postingClient.send('delete_post', postId);
  }
}
