import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserFollow } from './entities/user-follow.entity';
import { UserFollowCreatedEvent } from './events/user-follow-created.event';

@Injectable()
export class UserFollowService {
  constructor(
    @InjectRepository(UserFollow)
    private readonly userFollowRepository: EntityRepository<UserFollow>,
  ) {}

  /**
   * Retrieve user Follow data by id.
   * @param id user id to find user Follow data by.
   * @returns user Follow data.
   */
  async handleGetUserFollow(id: string): Promise<UserFollow> {
    return await this.userFollowRepository.findOne({ userId: id });
  }

  /**
   * Creates a new user Follow.
   * @param userFollowCreatedEvent is the user Follow.
   * @returns the newly created user Follow.
   */
  async handleCreateUserFollow(
    userFollowCreatedEvent: UserFollowCreatedEvent,
  ): Promise<UserFollow> {
    const userFollow = this.userFollowRepository.create({
      userId: userFollowCreatedEvent.userId,
      userFollowed: userFollowCreatedEvent.userFollowed,
      userFollowing: userFollowCreatedEvent.userFollowing,
    });

    await this.userFollowRepository.persistAndFlush(userFollow);

    return userFollow;
  }

  /**
   * Update deletedAt property of user data.
   * @param id is the user name of the user.
   * @returns
   */
  async handleDeleteUserFollow(id: string): Promise<void> {
    const userFollow = await this.handleGetUserFollow(id);
    if (!userFollow) throw new NotFoundException('User Follow not found');

    wrap(userFollow).assign({
      ...userFollow,
      deletedAt: new Date(),
    } as UserFollow);

    return await this.userFollowRepository.flush();
  }
}
