import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLogDto } from './dtos/create-user-log.dto';
import { UserLog } from './entities/user-log.entity';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: EntityRepository<UserLog>,
  ) {}

  async findAll(): Promise<UserLog[]> {
    return await this.userLogRepository.findAll();
  }

  async findOneToLog(username: string, password: string): Promise<UserLog> {
    return await this.userLogRepository.findOneOrFail( { userName: username, password: password });
  }

  async findOne(id: string): Promise<UserLog> {
    return await this.userLogRepository.findOne(id);
  }

  async create(userLog: CreateUserLogDto): Promise<UserLog> {
    const newUserLog = this.userLogRepository.create({
      userName: userLog.userName,
      email: userLog.email,
      password: userLog.password,
    });
    await this.userLogRepository.persistAndFlush(newUserLog);
    return newUserLog;
  }

  async update(id: string, userLogInfo: CreateUserLogDto): Promise<UserLog> {
    const userLog = await this.findOne(id);
    if (!userLog) throw new NotFoundException('User log not found');
    wrap(userLog).assign(userLogInfo);
    await this.userLogRepository.flush();

    return userLog;
  }

  async delete(id: string): Promise<void> {
    const userLog = await this.findOne(id);
    if (!userLog) throw new NotFoundException('User log not found');

    return await this.userLogRepository.removeAndFlush(userLog);
  }
}
