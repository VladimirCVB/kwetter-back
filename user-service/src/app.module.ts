import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserLogModule } from './user-log/user-log.module';
import { UserDataModule } from './user-data/user-data.module';
import { UserMentionsModule } from './user-mentions/user-mentions.module';
import { UserFollowModule } from './user-follow/user-follow.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MikroORM } from '@mikro-orm/core';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserLogModule,
    UserDataModule,
    UserMentionsModule,
    UserFollowModule,
    AuthModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    const migrator = this.orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();

    if (migrations && migrations.length > 0) {
      await migrator.up();
    }
  }
}
