import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserData } from 'src/user-data/entities/user-data.entity';
import { UserLog } from './entities/user-log.entity';
import { UserLogCreatedEvent } from './events/user-log-created.event';
import { UserLogUpdatedEvent } from './events/user-log-updated.event';
import * as bcrypt from 'bcrypt';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: EntityRepository<UserLog>,
    @InjectRepository(UserData)
    private readonly userDataRepository: EntityRepository<UserData>,
    private readonly producerService: ProducerService
  ) {}

  /**
   * Retrieve user log by credentials.
   * @param userEmail user email to find user log by.
   * @param userPassword user password to find user log by.
   * @returns user log.
   */
  async handleLogInUser(
    userEmail: string,
    userPassword: string,
  ): Promise<UserLog> {
    const user = await this.userLogRepository.findOne({ email: userEmail });
    if (await bcrypt.compare(userPassword, user.password)) return user;
  }

  /**
   * Retrieve all user logs.
   * @returns all user logs.
   */
  async handleGetAllUsers(): Promise<UserLog[]> {
    const users = await this.userLogRepository.findAll();
    const userDataReturn = [];
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      const nameOfUser = (
        await this.userDataRepository.findOne({ userId: element.id })
      ).lastName;

      userDataReturn[i] = {
        name: nameOfUser,
        userName: element.userName,
        email: element.email,
        userRole: element.userRole,
        createdAt: element.createdAt,
      };
    }
    return userDataReturn;
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
    return await this.userLogRepository.findOne({ userName: userName });
  }

  /**
   * Creates a new user log & user data in the database.
   * @param userLogCreatedEvent is the user log data.
   * @returns the newly created user log.
   */
  async handleUserCreated(
    userLogCreatedEvent: UserLogCreatedEvent,
  ): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userLogCreatedEvent.password, salt);

    const userLog = this.userLogRepository.create({
      userName: userLogCreatedEvent.userName,
      email: userLogCreatedEvent.email,
      password: hash,
    });
    const userData = this.userDataRepository.create({
      userId: userLog.id,
      firstName: userLogCreatedEvent.firstName,
      lastName: userLogCreatedEvent.lastName,
    });

    await this.userLogRepository.persistAndFlush(userLog);
    await this.userDataRepository.persistAndFlush(userData);

    return userLog.userName;
  }

  /**
   * Updates a user log.
   * @param userLogUpdatedEvent is the user log data.
   * @returns the updated user log.
   */
  async handleUpdateUser(
    userLogUpdatedEvent: UserLogUpdatedEvent,
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
   * Updates a user log.
   * @param status the status to change the rights.
   * @returns the updated user log.
   */
  async handleChangeAdminRights(data: any) {
    const userLogUpdate = await this.handleGetUserByUserName(
      data.status.userName,
    );
    if (!userLogUpdate) throw new NotFoundException('User log data not found');

    userLogUpdate.userRole = 'manager';
    if (!data.status.status) userLogUpdate.userRole = 'regular';

    await this.userLogRepository.persistAndFlush(userLogUpdate);

    return true;
  }

  /**
   * Update deletedAt property of user log data.
   * @param userName is the user name of the user.
   * @returns
   */
  async handleDeleteUser(userName: string) {
    const userLog = await this.handleGetUserByUserName(userName);
    if (!userLog) throw new NotFoundException('User log not found');

    const userData = await this.userDataRepository.findOne({ userId: userLog.id });

    userLog.email = '';
    userLog.userName = '';
    userData.bio = '';
    userData.school = '';
    userData.firstName = '';
    userData.lastName = '';
    userData.web = '';

    wrap(userLog).assign({ ...userLog, deletedAt: new Date() } as UserLog);
    wrap(userData).assign({ ...userData, deletedAt: new Date() } as UserData);

    await this.producerService.produce({
      topic: 'deleteUser',
      messages: [
        {
          value: userLog.id,
        },
      ],
    });

    // await this.userDataRepository.flush();
    return true; // await this.userLogRepository.flush();
  }
}
