import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { UpdateUserDataRequest } from '../dto/update-user-data-request.dto';
import { UserDataGatewayService } from '../services/user-data-gateway.service';

@Controller('user-data-gateway')
export class UserDataGatewayController {
  constructor(
    private readonly userDataGatewayService: UserDataGatewayService,
  ) {}

  @Get('/all')
  getAllUsersData() {
    return this.userDataGatewayService.getAllUsersData();
  }

  @Get('/:id')
  getUserDataById(@Param('id') id: string) {
    return this.userDataGatewayService.getUserDataById(id);
  }

  @Post('/create-data')
  createUserData(@Body() createUserDataRequest: CreateUserDataRequest) {
    return this.userDataGatewayService.createUserData(createUserDataRequest);
  }

  @Put('/update-data')
  updateUserData(
    @Body() updateUserDataRequest: UpdateUserDataRequest,
    id: string,
  ) {
    return this.userDataGatewayService.updateUserData(updateUserDataRequest, id);
  }

  @Delete('/delete-data/:id')
  deleteUserData(@Param('id') id: string) {
    return this.userDataGatewayService.deleteUserData(id);
  }
}
