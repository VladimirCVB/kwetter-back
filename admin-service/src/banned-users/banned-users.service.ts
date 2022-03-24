import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannedUsersDto } from './dtos/create-banned-users.dto';
import { BannedUsers } from './entities/banned-users.entity';

@Injectable()
export class BannedUsersService {

    constructor(
        @InjectRepository(BannedUsers)
        private readonly bannedUsersRepository: EntityRepository<BannedUsers>,
    ) { }

    async findAll(): Promise<BannedUsers[]> {
        return await this.bannedUsersRepository.findAll();
    }

    async findOne(id: string): Promise<BannedUsers> {
        return await this.bannedUsersRepository.findOne(id);
    }

    async create(bannedUsers: CreateBannedUsersDto): Promise<BannedUsers> {
        const newBannedUsers = this.bannedUsersRepository.create({
            userId: bannedUsers.userId,
        });
        await this.bannedUsersRepository.persistAndFlush(newBannedUsers);
        return newBannedUsers;
    }

    async update(id: string, bannedUsersInfo: CreateBannedUsersDto): Promise<BannedUsers> {
        const bannedUsers = await this.findOne(id);
        if (!bannedUsers) throw new NotFoundException('Banned Users data not found');
        wrap(bannedUsers).assign(bannedUsersInfo);
        await this.bannedUsersRepository.flush();

        return bannedUsers;
    }

    async delete(id: string): Promise<void> {
        const bannedUsers = await this.findOne(id);
        if (!bannedUsers) throw new NotFoundException('Banned Users data not found');

        return await this.bannedUsersRepository.removeAndFlush(bannedUsers);
    }
}
