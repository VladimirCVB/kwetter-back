import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserData } from 'src/user-data/entities/user-data.entity';
import { UserLog } from './entities/user-log.entity';
import { UserLogCreatedEvent } from './events/user-log-created.event';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: EntityRepository<UserLog>,
    @InjectRepository(UserData)
    private readonly userDataRepository: EntityRepository<UserData>,
  ) {}

  /**
   * Retrieve all user logs.
   * @returns all user logs.
   */
  async handleGetAllUsers(): Promise<UserLog[]> {
    return await this.userLogRepository.findAll();
  }

  /**
   * Retrieve user log by id.
   * @param userId user id to find user log by.
   * @returns user log.
   */
  async handleGetUserById(userId: string): Promise<UserLog> {
    return await this.userLogRepository.findOne(userId);
  }

  /**
   * Retrieve user log by user name.
   * @param userName user name to find user log by.
   * @returns user log.
   */
  async handleGetUserByUserName(userName: string): Promise<UserLog> {
    return await this.userLogRepository.findOne(userName);
  }

  /**
   * Creates a new user log & user data in the database.
   * @param userLogCreatedEvent is the user log data.
   * @returns the newly created user log.
   */
  async handleUserCreated(
    userLogCreatedEvent: UserLogCreatedEvent,
  ): Promise<UserLog> {
    const userLog = this.userLogRepository.create({
      userName: userLogCreatedEvent.userName,
      email: userLogCreatedEvent.email,
      password: userLogCreatedEvent.password,
    });
    const userData = this.userDataRepository.create({
      userId: userLog.id,
    });

    await this.userLogRepository.persistAndFlush(userLog);
    await this.userDataRepository.persistAndFlush(userData);

    return userLog;
  }

  /**
   * Updates a user log.
   * @param userLogUpdatedEvent is the user log data.
   * @returns the updated user log.
   */
  async handleUpdateUser(
    userLogUpdatedEvent: UserLogCreatedEvent,
  ): Promise<UserLog> {
    const userLogUpdate = await this.handleGetUserByUserName(
      userLogUpdatedEvent.userName,
    );
    if (!userLogUpdate) throw new NotFoundException('User log data not found');

    userLogUpdate.email = userLogUpdatedEvent.email;
    userLogUpdate.password = userLogUpdatedEvent.password;

    await this.userLogRepository.persistAndFlush(userLogUpdate);

    return userLogUpdate;
  }

  /**
   * Update deletedAt property of user log data.
   * @param userName is the user name of the user.
   * @returns
   */
  async handleDeleteUser(userName: string): Promise<void> {
    const userLog = await this.handleGetUserByUserName(userName);
    if (!userLog) throw new NotFoundException('User log not found');

    wrap(userLog).assign({ ...userLog, deletedAt: new Date() } as UserLog);

    return await this.userLogRepository.flush();
  }
}
