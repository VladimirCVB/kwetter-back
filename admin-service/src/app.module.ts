import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagerModule } from './user-manager/user-manager.module';
import { BannedUsersModule } from './banned-users/banned-users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UserManagerModule,
    BannedUsersModule,
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
