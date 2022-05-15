import { Body, Controller, Post } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';

@Controller('user-gateway')
export class UserGatewayController {
    constructor(private readonly userGatewayService: UserGatewayService) { }

    @Post()
    logIn(@Body() credentials: { email: string, password: string} ) {
        return this.userGatewayService.logIn(credentials.email, credentials.password);
    }
}
