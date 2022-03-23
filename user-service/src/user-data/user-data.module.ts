import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';

@Module({
  providers: [UserDataService],
  controllers: [UserDataController]
})
export class UserDataModule {}
