import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostTrendsDto } from './dtos/create-post-trends.dto';
import { PostTrends } from './entities/post-trends.entity';

@Injectable()
export class PostTrendsService {

    constructor(
        @InjectRepository(PostTrends)
        private readonly postTrendsRepository: EntityRepository<PostTrends>,
    ) { }

    async findAll(): Promise<PostTrends[]> {
        return await this.postTrendsRepository.findAll();
    }

    async findOne(id: string): Promise<PostTrends> {
        return await this.postTrendsRepository.findOne(id);
    }

    async create(postTrends: CreatePostTrendsDto): Promise<PostTrends> {
        const newPostTrends = this.postTrendsRepository.create({
            postId: postTrends.postId,
            trendName: postTrends.trendName,

        });
        await this.postTrendsRepository.persistAndFlush(newPostTrends);
        return newPostTrends;
    }

    async update(id: string, postTrendsInfo: CreatePostTrendsDto): Promise<PostTrends> {
        const postTrends = await this.findOne(id);
        if (!postTrends) throw new NotFoundException('Post trends data not found');
        wrap(postTrends).assign(postTrendsInfo);
        await this.postTrendsRepository.flush();

        return postTrends;
    }

    async delete(id: string): Promise<void> {
        const postTrends = await this.findOne(id);
        if (!postTrends) throw new NotFoundException('Post trends data not found');

        return await this.postTrendsRepository.removeAndFlush(postTrends);
    }
}
