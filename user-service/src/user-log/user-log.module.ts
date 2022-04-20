import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';
import { UserLog } from './entities/user-log.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserData } from 'src/user-data/entities/user-data.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserLog, UserData])],
  providers: [UserLogService],
  controllers: [UserLogController],
})
export class UserLogModule {}
