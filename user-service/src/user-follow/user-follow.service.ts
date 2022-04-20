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
    return await this.userFollowRepository.findOne(id);
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
   * Updates a user data.
   * @param userDataUpdatedEvent is the user data.
   * @returns the updated user data.
   */
  // async handleUpdateUserFollow(
  //   userDataUpdatedEvent: UserFollowCreatedEvent,
  //   id: string
  // ): Promise<UserFollow> {
  //   const userFollowUpdate = await this.handleGetUserFollow(id);
  //   if (!userFollowUpdate) throw new NotFoundException('User Follow not found');

  //   userFollowUpdate.userFollowed = userDataUpdatedEvent.userFollowed;
  //   wrap(userFollowUpdate).assign({ ...userFollowUpdate, userFollowed: userDataUpdatedEvent.userFollowed } as UserFollow);

  //   await this.userDataRepository.persistAndFlush(userLogUpdate);

  //   return userLogUpdate;
  // }

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
