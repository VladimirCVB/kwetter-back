import { wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDataDto } from './dtos/create-user-data.dto';
import { UserData } from './entities/user-data.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserDataService {
    constructor(
        @InjectRepository(UserData)
        private readonly userDataRepository: EntityRepository<UserData>,
    ) { }

    async findAll(): Promise<UserData[]> {
        return await this.userDataRepository.findAll();
    }

    async findOne(id: string): Promise<UserData> {
        return await this.userDataRepository.findOne(id);
    }

    async create(userData: CreateUserDataDto): Promise<UserData> {
        const newUserData = this.userDataRepository.create({
            // userId: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            school: userData.school,
            web: userData.web,
            bio: userData.bio,
        });
        await this.userDataRepository.persistAndFlush(newUserData);
        return newUserData;
    }

    async update(id: string, userDataInfo: CreateUserDataDto): Promise<UserData> {
        const userData = await this.findOne(id);
        if (!userData) throw new NotFoundException('User data not found');
        wrap(userData).assign(userDataInfo);
        await this.userDataRepository.flush();

        return userData;
    }

    async delete(id: string): Promise<void> {
        const userData = await this.findOne(id);
        if (!userData) throw new NotFoundException('User data not found');

        return await this.userDataRepository.removeAndFlush(userData);
    }
}
