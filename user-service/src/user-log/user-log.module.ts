import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';

@Module({
  providers: [UserLogService],
  controllers: [UserLogController]
})
export class UserLogModule {}
