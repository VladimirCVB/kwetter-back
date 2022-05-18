import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { UpdateUserDataRequest } from '../dto/update-user-data-request.dto';
import { UserDataGatewayService } from '../services/user-data-gateway.service';

@Controller('user-data-gateway')
@UseGuards(JwtAuthGuard)
export class UserDataGatewayController {
  constructor(
    private readonly userDataGatewayService: UserDataGatewayService,
  ) {}

  @Roles(Role.MANAGER)
  @UseGuards(RolesGuard)
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
