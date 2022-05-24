import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET, 
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // const user = await this.userLogService.handleGetUserById(payload.id);
    return {
      id: payload.sub,
      name: payload.name,
      // ...user
    };
  }
}
