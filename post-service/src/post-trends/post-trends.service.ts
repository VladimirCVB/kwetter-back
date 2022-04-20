import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PostTrends } from './entities/post-trends.entity';

@Injectable()
export class PostTrendsService {
  constructor(
    @InjectRepository(PostTrends)
    private readonly postTrendsRepository: EntityRepository<PostTrends>,
  ) {}

  /**
   * Retrieve all post trends.
   * @returns all post trends.
   */
  async findAll(): Promise<PostTrends[]> {
    return await this.postTrendsRepository.findAll();
  }
}
