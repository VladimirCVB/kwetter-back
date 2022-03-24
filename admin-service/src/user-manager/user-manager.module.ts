import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserManager } from './entities/user-manager.entity';
import { UserManagerController } from './user-manager.controller';
import { UserManagerService } from './user-manager.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserManager])],
  controllers: [UserManagerController],
  providers: [UserManagerService]
})
export class UserManagerModule {}
