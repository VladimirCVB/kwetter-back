import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserLogModule } from 'src/user-log/user-log.module';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserLogModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '900s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
