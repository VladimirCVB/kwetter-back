import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserFollowRequest } from '../dto/create-user-follow-request.dto';
import { UserFollowGatewayService } from '../services/user-follow-gateway.service';

@Controller('user-follow-gateway')
export class UserFollowGatewayController {
  constructor(
    private readonly userFollowGatewayService: UserFollowGatewayService,
  ) {}

  @Get()
  getUserFollow(@Body() userId: string) {
    return this.userFollowGatewayService.getUserFollow(userId);
  }

  @Post()
  createUserFollow(@Body() createUserFollowRequest: CreateUserFollowRequest) {
    return this.userFollowGatewayService.createUserFollow(createUserFollowRequest);
  }

  @Put()
  updateUserFollow(@Body() updateUserFollowRequest: CreateUserFollowRequest) {
    return this.userFollowGatewayService.updateUserFollow(updateUserFollowRequest);
  }

  @Delete()
  deleteUserFollow(@Body() userId: string) {
    return this.userFollowGatewayService.deleteUserFollow(userId);
  }
}
