import { Module } from '@nestjs/common';
import { UserFollowService } from './user-follow.service';
import { UserFollowController } from './user-follow.controller';

@Module({
  providers: [UserFollowService],
  controllers: [UserFollowController]
})
export class UserFollowModule {}
