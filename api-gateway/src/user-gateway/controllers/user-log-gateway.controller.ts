import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogGatewayService } from '../services/user-log-gateway.service';

@Controller('user-log-gateway')
export class UserLogGatewayController {
  constructor(private readonly userLogGatewayService: UserLogGatewayService) {}

  @Get('/test')
  getAllUsers() {
    this.userLogGatewayService.getAllUsers();
  }

  @Get()
  getUserById(@Body() userId: string) {
    this.userLogGatewayService.getUserById(userId);
  }

  @Post()
  getUserByCredentials(@Body() email: string, @Body() password: string) {
    this.userLogGatewayService.getUserByCredentials(email, password);
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserLogRequest) {
    this.userLogGatewayService.createUser(createUserRequest);
  }

  @Put()
  updateUser(@Body() updateUserRequest: CreateUserLogRequest) {
    this.userLogGatewayService.updateUser(updateUserRequest);
  }

  @Delete()
  deleteUser(@Body() userId: string) {
    this.userLogGatewayService.deleteUser(userId);
  }
}
