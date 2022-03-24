import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostDataModule } from './post-data/post-data.module';
import { PostTrendsModule } from './post-trends/post-trends.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    PostDataModule,
    PostTrendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
