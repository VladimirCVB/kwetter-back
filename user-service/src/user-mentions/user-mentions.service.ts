import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserMentionDto } from './dtos/create-user-mention.dto';
import { UserMention } from './entities/user-mention.entity';

@Injectable()
export class UserMentionsService {
  constructor(
    @InjectRepository(UserMention)
    private readonly userMentionRepository: EntityRepository<UserMention>,
  ) {}

  async findAll(): Promise<UserMention[]> {
    return await this.userMentionRepository.findAll();
  }

  async findOne(id: string): Promise<UserMention> {
    return await this.userMentionRepository.findOne(id);
  }

  async create(userMention: CreateUserMentionDto): Promise<UserMention> {
    const newUserMention = this.userMentionRepository.create({
      userId: userMention.userId,
      userMentioned: userMention.userMentioned,
      postId: userMention.postId,
    });
    await this.userMentionRepository.persistAndFlush(newUserMention);
    return newUserMention;
  }

  async update(
    id: string,
    userMentionInfo: CreateUserMentionDto,
  ): Promise<UserMention> {
    const userMention = await this.findOne(id);
    if (!userMention)
      throw new NotFoundException('User mention data not found');
    wrap(userMention).assign(userMentionInfo);
    await this.userMentionRepository.flush();

    return userMention;
  }

  async delete(id: string): Promise<void> {
    const userData = await this.findOne(id);
    if (!userData) throw new NotFoundException('User mention data not found');

    return await this.userMentionRepository.removeAndFlush(userData);
  }
}
