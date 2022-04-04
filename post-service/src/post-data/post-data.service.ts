import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDataDto } from './dtos/create-post-data.dto';
import { PostData } from './entities/post-data.entity';
import { PostCreatedEvent } from './events/post-created.event';
import { PostUpdatedEvent } from './events/post-updated.event';

@Injectable()
export class PostDataService {
  constructor(
    @InjectRepository(PostData)
    private readonly postDataRepository: EntityRepository<PostData>,
  ) {}

  handlePostCreated(postCreatedEvent: PostCreatedEvent) {
    console.log(postCreatedEvent);
  }

  handleGetPost(id: string) {
    console.log(id);
  }

  handleUpdatePost(postUpdatedEvent: PostUpdatedEvent) {
    console.log(postUpdatedEvent);
  }

  handleDeletePost(id: string) {
    console.log(id);
  }
}
