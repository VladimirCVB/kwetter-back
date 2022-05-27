import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { UserLogService } from '../user-log/user-log.service';

@Injectable()
export class AuthService {
  constructor(
    private userLogService: UserLogService,
    private jwtService: JwtService,
  ) {}

  async logInUser(userEmail: string, password: string) {
    const user = await this.userLogService.handleLogInUser(userEmail, password);
    if (user == null) return new Error('Credentials do not match');

    return this.createAccessToken(user);
  }

  createAccessToken(user: UserLog) {
    const payload = {
      id: user.id,
      userName: user.userName,
      role: user.userRole,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
