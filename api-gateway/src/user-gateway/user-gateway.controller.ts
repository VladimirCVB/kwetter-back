import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserGatewayService } from './user-gateway.service';

@Controller('user-gateway')
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'Authenticates user, returns JWT',
  })
  @Post()
  logIn(@Body() credentials: { email: string; password: string }) {
    return this.userGatewayService.logIn(
      credentials.email,
      credentials.password,
    );
  }

  @ApiOperation({ summary: 'Get user data' })
  @ApiResponse({
    status: 200,
    description: 'Returns user data',
  })
  @Get('/user-profile/:uid')
  getProfileData(@Param('uid') userId: string) {
    return this.userGatewayService.getProfileData(userId);
  }
}
