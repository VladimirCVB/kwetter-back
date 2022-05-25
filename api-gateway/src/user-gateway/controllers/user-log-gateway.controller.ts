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
  @Get('/all')
  getAllUsers() {
    return this.userLogGatewayService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    return this.userLogGatewayService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user-name/:uname')
  getUserByUserName(@Param('uname') userName: string) {
    return this.userLogGatewayService.getUserByUserName(userName);
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

  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/admin/rights')
  changeAdminRights(@Body() status: boolean, userName: string) {
    return this.userLogGatewayService.changeAdminRights(status, userName);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-log/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userLogGatewayService.deleteUser(userId);
  }
}
