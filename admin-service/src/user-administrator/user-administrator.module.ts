import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserAdministrator } from './entities/user-administrator.entity';
import { UserAdministratorController } from './user-administrator.controller';
import { UserAdministratorService } from './user-administrator.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserAdministrator])],
  controllers: [UserAdministratorController],
  providers: [UserAdministratorService],
})
export class UserAdministratorModule {}
