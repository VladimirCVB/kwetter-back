import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserFollowRequest } from '../dto/create-user-follow-request.dto';
import { UserFollowGatewayService } from '../services/user-follow-gateway.service';

@Controller('user-follow-gateway')
@UseGuards(JwtAuthGuard)
export class UserFollowGatewayController {
  constructor(
    private readonly userFollowGatewayService: UserFollowGatewayService,
  ) {}

  @Get('/:id')
  getUserFollow(@Param('id') userId: string) {
    return this.userFollowGatewayService.getUserFollow(userId);
  }

  @Post('/create-follow')
  createUserFollow(@Body() createUserFollowRequest: CreateUserFollowRequest) {
    return this.userFollowGatewayService.createUserFollow(createUserFollowRequest);
  }

  @Put('/update-follow')
  updateUserFollow(@Body() updateUserFollowRequest: CreateUserFollowRequest) {
    return this.userFollowGatewayService.updateUserFollow(updateUserFollowRequest);
  }

  @Delete('/delete-follow/:id')
  deleteUserFollow(@Param('id') userId: string) {
    return this.userFollowGatewayService.deleteUserFollow(userId);
  }
}
