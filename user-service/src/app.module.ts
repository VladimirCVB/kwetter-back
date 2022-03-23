import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserLogModule } from './user-log/user-log.module';
import { UserDataModule } from './user-data/user-data.module';
import { UserMentionsModule } from './user-mentions/user-mentions.module';
import { UserFollowModule } from './user-follow/user-follow.module';

@Module({
  imports: [UserLogModule, UserDataModule, UserMentionsModule, UserFollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}