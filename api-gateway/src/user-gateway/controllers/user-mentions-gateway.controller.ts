import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserMentionRequest } from '../dto/create-user-mention-request.dto';
import { UserMentionsGatewayService } from '../services/user-mentions-gateway.service';

@Controller('user-mentions-gateway')
export class UserMentionsGatewayController {
  constructor(
    private readonly userMentionGatewayService: UserMentionsGatewayService,
  ) {}

  @Get('/:id')
  getUserMention(@Param('id') id: string) {
    return this.userMentionGatewayService.getUserMention(id);
  }

  @Post('/create-mention')
  createUserMention(
    @Body() createUserMentionsRequest: CreateUserMentionRequest,
  ) {
    return this.userMentionGatewayService.createUserMention(createUserMentionsRequest);
  }

  // @Put()
  // updateUserMention(@Body() updateUserMentionsRequest: CreateUserMentionRequest) {
  //     this.userMentionGatewayService.updateUserMention(updateUserMentionsRequest);
  // }

  @Delete('/delete-mention/:id')
  deleteUserMention(@Param('id') id: string) {
    return this.userMentionGatewayService.deleteUserMention(id);
  }
}
