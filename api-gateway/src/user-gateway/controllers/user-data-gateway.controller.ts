import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { UpdateUserDataRequest } from '../dto/update-user-data-request.dto';
import { UserDataGatewayService } from '../services/user-data-gateway.service';

@Controller('user-data-gateway')
export class UserDataGatewayController {
  constructor(
    private readonly userDataGatewayService: UserDataGatewayService,
  ) {}

  @Get()
  getAllUsersData() {
    this.userDataGatewayService.getAllUsersData();
  }

  @Get()
  getUserDataById(@Body() id: string) {
    this.userDataGatewayService.getUserDataById(id);
  }

  @Post()
  createUserData(@Body() createUserDataRequest: CreateUserDataRequest) {
    this.userDataGatewayService.createUserData(createUserDataRequest);
  }

  @Put()
  updateUserData(
    @Body() updateUserDataRequest: UpdateUserDataRequest,
    id: string,
  ) {
    this.userDataGatewayService.updateUserData(updateUserDataRequest, id);
  }

  @Delete()
  deleteUserData(@Body() id: string) {
    this.userDataGatewayService.deleteUserData(id);
  }
}
