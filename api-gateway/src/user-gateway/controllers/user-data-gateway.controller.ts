import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { UpdateUserDataRequest } from '../dto/update-user-data-request.dto';
import { UserDataGatewayService } from '../services/user-data-gateway.service';

@Controller('user-data-gateway')
export class UserDataGatewayController {
    constructor(private readonly userDataGatewayService: UserDataGatewayService) { }

    @Get()
    getAllUsersData() {
        this.userDataGatewayService.getAllUsersData();
    }

    @Get()
    getUserDataById(@Body() userId: string) {
        this.userDataGatewayService.getUserDataById(userId);
    }

    @Post()
    createUserData(@Body() createUserDataRequest: CreateUserDataRequest) {
        this.userDataGatewayService.createUserData(createUserDataRequest);
    }

    @Put()
    updateUserData(@Body() updateUserDataRequest: UpdateUserDataRequest) {
        this.userDataGatewayService.updateUserData(updateUserDataRequest);
    }

    @Delete()
    deleteUserData(@Body() userId: string) {
        this.userDataGatewayService.deleteUserData(userId);
    }
}
