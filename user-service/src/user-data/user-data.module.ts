import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { UserData } from './entities/user-data.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserData])],
  providers: [UserDataService],
  controllers: [UserDataController],
})
export class UserDataModule {}
