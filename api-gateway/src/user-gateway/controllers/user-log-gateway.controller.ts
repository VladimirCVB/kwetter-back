import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { CreateUserDataRequest } from '../dto/create-user-data-request.dto';
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogGatewayService } from '../services/user-log-gateway.service';

@Controller('user-log-gateway')
export class UserLogGatewayController {
  constructor(private readonly userLogGatewayService: UserLogGatewayService,
  ) { }
  
  @UseGuards(JwtAuthGuard)
  @Roles(Role.MANAGER)
  @UseGuards(RolesGuard)
  @Get('/all')
  getAllUsers() {
    return this.userLogGatewayService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    return this.userLogGatewayService.getUserById(userId);
  }

  @Post('/auth')
  getUserByCredentials(@Body() email: string, @Body() password: string) {
    return this.userLogGatewayService.getUserByCredentials(email, password);
  }

  @Post('/create-log')
  createUser(@Body() createUserRequest: CreateUserLogRequest) {
    return this.userLogGatewayService.createUser(createUserRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-log')
  updateUser(@Body() updateUserRequest: CreateUserLogRequest) {
    return this.userLogGatewayService.updateUser(updateUserRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-log/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userLogGatewayService.deleteUser(userId);
  }
}
