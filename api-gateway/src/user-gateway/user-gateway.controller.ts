import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';

@Controller('user-gateway')
export class UserGatewayController {
    constructor(private readonly userGatewayService: UserGatewayService) { }

    @Post()
    logIn(@Body() credentials: { email: string, password: string }) {
        return this.userGatewayService.logIn(credentials.email, credentials.password);
    }

    @Get('/user-profile/:uid')
    getProfileData(@Param('uid') userId: string) {
        return this.userGatewayService.getProfileData(userId);
    }
}
