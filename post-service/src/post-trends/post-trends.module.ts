import { Module } from '@nestjs/common';
import { PostTrendsService } from './post-trends.service';
import { PostTrendsController } from './post-trends.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostTrends } from './entities/post-trends.entity';

@Module({
  imports: [MikroOrmModule.forFeature([PostTrends])],
  providers: [PostTrendsService],
  controllers: [PostTrendsController]
})
export class PostTrendsModule {}
