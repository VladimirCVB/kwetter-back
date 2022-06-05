import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { PostTrends } from 'src/post-trends/entities/post-trends.entity';
import { PostData } from './entities/post-data.entity';
import { PostDataController } from './post-data.controller';
import { PostDataService } from './post-data.service';

@Module({
  imports: [MikroOrmModule.forFeature([PostData, PostTrends]), KafkaModule],
  providers: [PostDataService],
  controllers: [PostDataController],
})
export class PostDataModule {}
