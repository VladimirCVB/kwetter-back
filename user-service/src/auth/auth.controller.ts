import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('log_user')
  login(credentials: any): any {
    return this.authService.logInUser(credentials.email, credentials.password);
  }
}
