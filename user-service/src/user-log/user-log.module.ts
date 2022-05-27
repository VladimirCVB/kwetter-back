import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';
import { UserLog } from './entities/user-log.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { UserData } from 'src/user-data/entities/user-data.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserLog, UserData])],
  exports: [UserLogService],
  providers: [UserLogService, JwtStrategy],
  controllers: [UserLogController],
})
export class UserLogModule {}
