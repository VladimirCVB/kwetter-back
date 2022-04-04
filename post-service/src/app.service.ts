import { Injectable } from '@nestjs/common';
import { PostCreatedEvent } from './post-created.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handlePostCreated(postCreatedEvent: PostCreatedEvent) {
    console.log(postCreatedEvent);
  }

  handleGetPost(id: string) {
    console.log(id);
  }
}
