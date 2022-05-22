import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserLogModule } from './user-log/user-log.module';
import { UserDataModule } from './user-data/user-data.module';
import { UserMentionsModule } from './user-mentions/user-mentions.module';
import { UserFollowModule } from './user-follow/user-follow.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    UserLogModule,
    UserDataModule,
    UserMentionsModule,
    UserFollowModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
