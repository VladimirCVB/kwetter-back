import { wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserData } from './entities/user-data.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserDataCreatedEvent } from './events/user-data-created.event';
import { UserDataUpdatedEvent } from './events/user-data-updated.event';

@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(UserData)
    private readonly userDataRepository: EntityRepository<UserData>,
  ) {}

  /**
   * Retrieve all user data.
   * @returns all user data.
   */
  async handleGetAllUsersData(): Promise<UserData[]> {
    return await this.userDataRepository.findAll();
  }

  /**
   * Retrieve user data by id.
   * @param userId user id to find user data by.
   * @returns user data.
   */
  async handleGetUserDataById(userId: string): Promise<UserData> {
    return await this.userDataRepository.findOne(userId);
  }

  /**
   * Creates a new user data.
   * @param userDataCreatedEvent is the user data.
   * @returns the newly created user data.
   */
  async handleCreateUserData(
    userDataCreatedEvent: UserDataCreatedEvent,
  ): Promise<UserData> {
    const userData = this.userDataRepository.create({
      userId: userDataCreatedEvent.userId,
    });

    await this.userDataRepository.persistAndFlush(userData);

    return userData;
  }

  /**
   * Updates a user data.
   * @param userDataUpdatedEvent is the user data.
   * @returns the updated user data.
   */
  async handleUpdateUserData(
    userDataUpdatedEvent: UserDataUpdatedEvent,
    id: string,
  ): Promise<UserData> {
    const userLogUpdate = await this.handleGetUserDataById(id);
    if (!userLogUpdate) throw new NotFoundException('User data not found');

    userLogUpdate.firstName = userDataUpdatedEvent.firstName;
    userLogUpdate.lastName = userDataUpdatedEvent.lastName;
    userLogUpdate.school = userDataUpdatedEvent.school;
    userLogUpdate.web = userDataUpdatedEvent.web;
    userLogUpdate.bio = userDataUpdatedEvent.bio;

    await this.userDataRepository.persistAndFlush(userLogUpdate);

    return userLogUpdate;
  }

  /**
   * Update deletedAt property of user data.
   * @param id is the user name of the user.
   * @returns
   */
  async handleDeleteUserData(id: string): Promise<void> {
    const userData = await this.handleGetUserDataById(id);
    if (!userData) throw new NotFoundException('User data not found');

    wrap(userData).assign({ ...userData, deletedAt: new Date() } as UserData);

    return await this.userDataRepository.flush();
  }
}
