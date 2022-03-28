import { Module } from '@nestjs/common';
import { UserMentionsService } from './user-mentions.service';
import { UserMentionsController } from './user-mentions.controller';
import { UserMention } from './entities/user-mention.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([UserMention])],
  providers: [UserMentionsService],
  controllers: [UserMentionsController],
})
export class UserMentionsModule {}
