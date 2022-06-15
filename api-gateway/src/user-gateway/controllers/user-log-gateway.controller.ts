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
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogGatewayService } from '../services/user-log-gateway.service';

@Controller('user-log-gateway')
export class UserLogGatewayController {
  constructor(private readonly userLogGatewayService: UserLogGatewayService) {}

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all user log data' })
  @ApiResponse({
    status: 200,
    description: 'Returns all user log data to admin',
  })
  @Get('/all')
  getAllUsers() {
    return this.userLogGatewayService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user log data by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns user log data by id',
  })
  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    return this.userLogGatewayService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user log data by userName' })
  @ApiResponse({
    status: 200,
    description: 'Returns user log data by userName',
  })
  @Get('/user-name/:uname')
  getUserByUserName(@Param('uname') userName: string) {
    return this.userLogGatewayService.getUserByUserName(userName);
  }

  @Post('/auth')
  getUserByCredentials(@Body() email: string, @Body() password: string) {
    return this.userLogGatewayService.getUserByCredentials(email, password);
  }

  @ApiOperation({ summary: 'Create new user log entry' })
  @ApiResponse({
    status: 201,
    description: 'Creates new user data entry',
  })
  @Post('/create-log')
  createUser(@Body() createUserRequest: CreateUserLogRequest) {
    return this.userLogGatewayService.createUser(createUserRequest);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user log data' })
  @ApiResponse({
    status: 204,
    description: 'Updates user log data',
  })
  @Put('/update-log')
  updateUser(@Body() updateUserRequest: CreateUserLogRequest) {
    return this.userLogGatewayService.updateUser(updateUserRequest);
  }

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user admin rights' })
  @ApiResponse({
    status: 204,
    description: 'Updates user admin rights',
  })
  @Put('/admin/rights')
  changeAdminRights(@Body() status: boolean, userName: string) {
    return this.userLogGatewayService.changeAdminRights(status, userName);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user log data' })
  @ApiResponse({
    status: 200,
    description:
      'Deletes user log data by id, without removing the entries in the database',
  })
  @Delete('/delete-log/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userLogGatewayService.deleteUser(userId);
  }
}
