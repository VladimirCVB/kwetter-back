import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAdministratorDto } from './dtos/create-user-administrator.dto';
import { UserAdministrator } from './entities/user-administrator.entity';

@Injectable()
export class UserAdministratorService {
  constructor(
    @InjectRepository(UserAdministrator)
    private readonly userAdministratorRepository: EntityRepository<UserAdministrator>,
  ) {}

  async findAll(): Promise<UserAdministrator[]> {
    return await this.userAdministratorRepository.findAll();
  }

  async findOne(id: string): Promise<UserAdministrator> {
    return await this.userAdministratorRepository.findOne(id);
  }

  async create(
    userAdministrator: CreateUserAdministratorDto,
  ): Promise<UserAdministrator> {
    const newUserAdministrator = this.userAdministratorRepository.create({
      userId: userAdministrator.userId,
    });
    await this.userAdministratorRepository.persistAndFlush(
      newUserAdministrator,
    );
    return newUserAdministrator;
  }

  async update(
    id: string,
    userAdministratorInfo: CreateUserAdministratorDto,
  ): Promise<UserAdministrator> {
    const userAdministrator = await this.findOne(id);
    if (!userAdministrator)
      throw new NotFoundException('User Administrator data not found');
    wrap(userAdministrator).assign(userAdministratorInfo);
    await this.userAdministratorRepository.flush();

    return userAdministrator;
  }

  async delete(id: string): Promise<void> {
    const userAdministrator = await this.findOne(id);
    if (!userAdministrator)
      throw new NotFoundException('User Administrator data not found');

    return await this.userAdministratorRepository.removeAndFlush(
      userAdministrator,
    );
  }
}
