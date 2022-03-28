import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagerModule } from './user-manager/user-manager.module';
import { UserAdministratorModule } from './user-administrator/user-administrator.module';
import { BannedUsersModule } from './banned-users/banned-users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UserManagerModule,
    // UserAdministratorModule,
    BannedUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
