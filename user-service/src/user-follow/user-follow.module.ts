import { Module } from '@nestjs/common';
import { UserFollowService } from './user-follow.service';

@Module({
  providers: [UserFollowService]
})
export class UserFollowModule {}
