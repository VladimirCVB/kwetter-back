import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserManagerDto } from './dtos/create-user-manager.dto';
import { UserManager } from './entities/user-manager.entity';

@Injectable()
export class UserManagerService {
  constructor(
    @InjectRepository(UserManager)
    private readonly userManagerRepository: EntityRepository<UserManager>,
  ) {}

  async findAll(): Promise<UserManager[]> {
    return await this.userManagerRepository.findAll();
  }

  async findOne(id: string): Promise<UserManager> {
    return await this.userManagerRepository.findOne(id);
  }

  async create(userManager: CreateUserManagerDto): Promise<UserManager> {
    const newUserManager = this.userManagerRepository.create({
      userId: userManager.userId,
    });
    await this.userManagerRepository.persistAndFlush(newUserManager);
    return newUserManager;
  }

  async update(
    id: string,
    userManagerInfo: CreateUserManagerDto,
  ): Promise<UserManager> {
    const userManager = await this.findOne(id);
    if (!userManager)
      throw new NotFoundException('User manager data not found');
    wrap(userManager).assign(userManagerInfo);
    await this.userManagerRepository.flush();

    return userManager;
  }

  async delete(id: string): Promise<void> {
    const userManager = await this.findOne(id);
    if (!userManager)
      throw new NotFoundException('User manager data not found');

    return await this.userManagerRepository.removeAndFlush(userManager);
  }
}
