import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserLogRequest } from '../dto/create-user-log-request.dto';
import { UserLogGatewayService } from '../services/user-log-gateway.service';

@Controller('user-log-gateway')
export class UserLogGatewayController {
  constructor(private readonly userLogGatewayService: UserLogGatewayService,
    ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllUsers() {
    return this.userLogGatewayService.getAllUsers();
  }

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

  @Put('/update-log')
  updateUser(@Body() updateUserRequest: CreateUserLogRequest) {
    return this.userLogGatewayService.updateUser(updateUserRequest);
  }

  @Delete('/delete-log/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userLogGatewayService.deleteUser(userId);
  }
}
