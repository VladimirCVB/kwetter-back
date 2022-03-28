import { Module } from '@nestjs/common';
import { UserFollowService } from './user-follow.service';
import { UserFollowController } from './user-follow.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserFollow } from './entities/user-follow.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserFollow])],
  providers: [UserFollowService],
  controllers: [UserFollowController],
})
export class UserFollowModule {}
