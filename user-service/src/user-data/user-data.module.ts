import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { UserData } from './entities/user-data.entity';
import { UserLog } from 'src/user-log/entities/user-log.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserData, UserLog])],
  providers: [UserDataService],
  controllers: [UserDataController],
})
export class UserDataModule {}
