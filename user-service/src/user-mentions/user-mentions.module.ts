import { Module } from '@nestjs/common';
import { UserMentionsService } from './user-mentions.service';

@Module({
  providers: [UserMentionsService]
})
export class UserMentionsModule {}
