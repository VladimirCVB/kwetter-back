import { Module } from '@nestjs/common';
import { BannedUsersService } from './banned-users.service';
import { BannedUsersController } from './banned-users.controller';
import { BannedUsers } from './entities/banned-users.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([BannedUsers])],
  providers: [BannedUsersService],
  controllers: [BannedUsersController]
})
export class BannedUsersModule {}
