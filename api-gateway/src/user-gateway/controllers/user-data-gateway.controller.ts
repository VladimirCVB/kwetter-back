import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all user log data to admin',
  })
  @Get('/all')
  getAllUsersData() {
    return this.userDataGatewayService.getAllUsersData();
  }

  @ApiOperation({ summary: 'Get user data by userName' })
  @ApiResponse({
    status: 200,
    description: 'Returns user data by userName',
  })
  @Get('/:uname')
  getUserDataById(@Param('uname') userName: string) {
    return this.userDataGatewayService.getUserDataById(userName);
  }

  @ApiOperation({ summary: 'Create new user data' })
  @ApiResponse({
    status: 201,
    description: 'Creates new user data entry',
  })
  @Post('/create-data')
  createUserData(@Body() createUserDataRequest: CreateUserDataRequest) {
    return this.userDataGatewayService.createUserData(createUserDataRequest);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({
    status: 204,
    description: 'Updates user data',
  })
  @Put('/update-data')
  updateUserData(
    @Body() updateUserDataRequest: UpdateUserDataRequest,
    id: string,
  ) {
    return this.userDataGatewayService.updateUserData(
      updateUserDataRequest,
      id,
    );
  }

  @ApiOperation({ summary: 'Delete user data' })
  @ApiResponse({
    status: 200,
    description:
      'Deletes user data by userName, without removing the entries in the database',
  })
  @Delete('/delete-data/:id')
  deleteUserData(@Param('id') id: string) {
    return this.userDataGatewayService.deleteUserData(id);
  }
}
