import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostDataModule } from './post-data/post-data.module';
import { PostTrendsModule } from './post-trends/post-trends.module';
import { MikroORM } from '@mikro-orm/core';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    PostDataModule,
    PostTrendsModule,
    KafkaModule
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
