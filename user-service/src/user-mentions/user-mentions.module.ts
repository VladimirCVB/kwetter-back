import { Module } from '@nestjs/common';
import { UserMentionsService } from './user-mentions.service';
import { UserMentionsController } from './user-mentions.controller';

@Module({
  providers: [UserMentionsService],
  controllers: [UserMentionsController]
})
export class UserMentionsModule {}
