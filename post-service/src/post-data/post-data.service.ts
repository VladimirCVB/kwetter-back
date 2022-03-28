import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDataDto } from './dtos/create-post-data.dto';
import { PostData } from './entities/post-data.entity';

@Injectable()
export class PostDataService {
  constructor(
    @InjectRepository(PostData)
    private readonly postDataRepository: EntityRepository<PostData>,
  ) {}

  async findAll(): Promise<PostData[]> {
    return await this.postDataRepository.findAll();
  }

  async findOne(id: string): Promise<PostData> {
    return await this.postDataRepository.findOne(id);
  }

  async create(postData: CreatePostDataDto): Promise<PostData> {
    const newPostData = this.postDataRepository.create({
      userId: postData.userId,
      hearts: postData.hearts,
      text: postData.text,
      trends: postData.trends,
    });
    await this.postDataRepository.persistAndFlush(newPostData);
    return newPostData;
  }

  async update(id: string, postDataInfo: CreatePostDataDto): Promise<PostData> {
    const postData = await this.findOne(id);
    if (!postData) throw new NotFoundException('Post data not found');
    wrap(postData).assign(postDataInfo);
    await this.postDataRepository.flush();

    return postData;
  }

  async delete(id: string): Promise<void> {
    const postData = await this.findOne(id);
    if (!postData) throw new NotFoundException('Post data not found');

    return await this.postDataRepository.removeAndFlush(postData);
  }
}
