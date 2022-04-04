import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserLogService } from 'src/user-log/user-log.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userLogService: UserLogService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.userLogService.findOne(payload.id);
    return {
      id: payload.sub,
      name: payload.name,
      ...user
    };
  }
}
