import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostData } from './entities/post-data.entity';
import { PostDataController } from './post-data.controller';
import { PostDataService } from './post-data.service';

@Module({
  imports: [MikroOrmModule.forFeature([PostData])],
  providers: [PostDataService],
  controllers: [PostDataController]
})
export class PostDataModule {}
