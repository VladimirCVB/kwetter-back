import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer.service';
import { PostTrends } from 'src/post-trends/entities/post-trends.entity';
import { PostData } from './entities/post-data.entity';
import { PostCreatedEvent } from './events/post-created.event';
import { PostUpdatedEvent } from './events/post-updated.event';

@Injectable()
export class PostDataService {
  constructor(
    @InjectRepository(PostData)
    private readonly postDataRepository: EntityRepository<PostData>,

    @InjectRepository(PostTrends)
    private readonly postTrendsRepository: EntityRepository<PostTrends>,

    private readonly consumerService: ConsumerService,
  ) {}

  /**
   * Retrieve all posts.
   * @returns all posts.
   */
  async handleGetAllPosts(): Promise<PostData[]> {
    return await this.postDataRepository.findAll();
  }

  /**
   * Retrieve posts by user ids.
   * @param userIds user ids to find posts by.
   * @returns an array of posts.
   */
  async handleGetPosts(userIds: string[]): Promise<PostData[]> {
    return await this.postDataRepository.find(userIds);
  }

  /**
   * Retrieve posts by user.
   * @param userId user id to find posts by.
   * @returns an array of posts.
   */
  async handleGetPostByUserId(userId: string) {
    return await this.postDataRepository.find({ user_id: userId });
  }

  /**
   * Retrieve one post.
   * @param postId the id of the post.
   * @returns a post.
   */
  async handleGetPostById(postId: string): Promise<PostData> {
    return await this.postDataRepository.findOne({ id: postId });
  }

  /**
   * Creates a new post & post trends in the database.
   * @param postCreatedEvent is the post data.
   * @returns the newly created post.
   */
  async handlePostCreated(
    postCreatedEvent: PostCreatedEvent,
  ): Promise<PostData> {
    const postData = this.postDataRepository.create({
      user_id: postCreatedEvent.userId,
      userName: postCreatedEvent.userName,
      text: postCreatedEvent.text,
      hearts: 0,
    });
    const postTrends = this.postTrendsRepository.create({
      postId: postData.id,
      trends: postCreatedEvent.trends,
    });

    await this.postDataRepository.persistAndFlush(postData);
    await this.postTrendsRepository.persistAndFlush(postTrends);

    return postData;
  }

  /**
   * Updates a post & post trends.
   * @param postUpdatedEvent is the post data.
   * @returns the updated post.
   */
  async handleUpdatePost(
    postUpdatedEvent: PostUpdatedEvent,
  ): Promise<PostData> {
    const postDataUpdate = await this.handleGetPostById(postUpdatedEvent.id);
    if (!postDataUpdate) throw new NotFoundException('Post data not found');

    postDataUpdate.hearts = postUpdatedEvent.hearts;
    postDataUpdate.text = postUpdatedEvent.text;
    postDataUpdate.userName = postUpdatedEvent.userName;

    await this.postDataRepository.persistAndFlush(postDataUpdate);

    const postTrends = await this.postTrendsRepository.findOne({
      postId: postUpdatedEvent.id,
    });
    postTrends.trends = postUpdatedEvent.trends;

    await this.postTrendsRepository.persistAndFlush(postTrends);
    return postDataUpdate;
  }

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'deleteUser' },
      {
        eachMessage: async ({ message }) => {
          this.handleDeleteAllPostData(message.value.toString());
          console.log('working', message.value.toString());
        },
      },
    );
  }

  /**
   * Update deletedAt property of post data & post trends.
   * @param userId is the id of the user who created the post.
   * @returns
   */
  async handleDeleteAllPostData(userId: string): Promise<void> {
    const postData = await this.postDataRepository.find({ user_id: userId });

    for (let i = 0; i < postData.length; i++) {
      this.postDataRepository.remove(postData[i]);
    }

    return await this.postDataRepository.flush();
  }

  /**
   * Update deletedAt property of post data & post trends.
   * @param postId is the id of the post.
   * @returns
   */
  async handleDeletePost(postId: string): Promise<void> {
    const postData = await this.handleGetPostById(postId);
    const postTrends = await this.postTrendsRepository.findOne({
      postId: postId,
    });

    if (!postData) throw new NotFoundException('Post not found');

    wrap(postData).assign({ ...postData, deletedAt: new Date() } as PostData);
    wrap(postTrends).assign({
      ...postTrends,
      deletedAt: new Date(),
    } as PostTrends);

    await this.postTrendsRepository.flush();
    return await this.postDataRepository.flush();
  }
}
