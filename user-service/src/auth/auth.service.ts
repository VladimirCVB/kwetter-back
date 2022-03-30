import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogService } from '../user-log/user-log.service';

@Injectable()
export class AuthService {
  constructor(
    private userLogService: UserLogService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<void> {
    const user = await this.userLogService.findOne('1');
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
