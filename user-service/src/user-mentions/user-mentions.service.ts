import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserMention } from './entities/user-mention.entity';
import { UserMentionCreatedEvent } from './events/user-mention-created.event';

@Injectable()
export class UserMentionsService {
  constructor(
    @InjectRepository(UserMention)
    private readonly userMentionRepository: EntityRepository<UserMention>,
  ) {}

  /**
   * Retrieve user mention data by id.
   * @param id user id to find user mention data by.
   * @returns user mention data.
   */
  async handleGetUserMention(id: string): Promise<UserMention> {
    return await this.userMentionRepository.findOne(id);
  }

  /**
   * Creates a new user mention.
   * @param userMentionCreatedEvent is the user mention.
   * @returns the newly created user mention.
   */
  async handleCreateUserMention(
    userMentionCreatedEvent: UserMentionCreatedEvent,
  ): Promise<UserMention> {
    const userMention = this.userMentionRepository.create({
      userId: userMentionCreatedEvent.userId,
      userMentiones: userMentionCreatedEvent.userMentions,
      postId: userMentionCreatedEvent.postId,
    });

    await this.userMentionRepository.persistAndFlush(userMention);

    return userMention;
  }

  /**
   * Update deletedAt property of user data.
   * @param id is the user name of the user.
   * @returns
   */
  async handleDeleteUserMention(id: string): Promise<void> {
    const userMention = await this.handleGetUserMention(id);
    if (!userMention) throw new NotFoundException('User mention not found');

    wrap(userMention).assign({
      ...userMention,
      deletedAt: new Date(),
    } as UserMention);

    return await this.userMentionRepository.flush();
  }
}
