import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('get_user_by_credentials')
  login(@Body() userEmail: string, @Body() password: string): any {
    return this.authService.logInUser(userEmail, password);
  }
}
