import { Controller, Get, Param } from '@nestjs/common';
import { AdminGatewayService } from 'src/admin-gateway/admin-gateway.service';
import { UserLogGatewayService } from './services/user-log-gateway.service';
import { UserGatewayService } from './user-gateway.service';

@Controller('user-gateway')
export class UserGatewayController {
    constructor(private readonly userGatewayService: UserLogGatewayService) { }

    @Get()
    getAdmin() {
        return this.userGatewayService.getAllUsers();
    }
}
