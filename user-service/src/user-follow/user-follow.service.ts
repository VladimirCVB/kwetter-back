import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserFollowDto } from './dtos/create-user-follow.dto';
import { UserFollow } from './entities/user-follow.entity';

@Injectable()
export class UserFollowService {

    constructor(
        @InjectRepository(UserFollow)
        private readonly userFollowRepository: EntityRepository<UserFollow>,
    ) { }

    async findAll(): Promise<UserFollow[]> {
        return await this.userFollowRepository.findAll();
    }

    async findOne(id: string): Promise<UserFollow> {
        return await this.userFollowRepository.findOne(id);
    }

    async create(userFollow: CreateUserFollowDto): Promise<UserFollow> {
        const newUserFollow = this.userFollowRepository.create({
            userId: userFollow.userId,
            userFollowed: userFollow.userFollowed,
            userFollowing: userFollow.userFollowing,
        });
        await this.userFollowRepository.persistAndFlush(newUserFollow);
        return newUserFollow;
    }

    async update(id: string, userDataInfo: CreateUserFollowDto): Promise<UserFollow> {
        const userData = await this.findOne(id);
        if (!userData) throw new NotFoundException('User follow data not found');
        wrap(userData).assign(userDataInfo);
        await this.userFollowRepository.flush();

        return userData;
    }

    async delete(id: string): Promise<void> {
        const userData = await this.findOne(id);
        if (!userData) throw new NotFoundException('User follow data not found');

        return await this.userFollowRepository.removeAndFlush(userData);
    }
    
}
