import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserMentionRequest } from '../dto/create-user-mention-request.dto';
import { UserMentionsGatewayService } from '../services/user-mentions-gateway.service';

@Controller('user-mentions-gateway')
export class UserMentionsGatewayController {
    constructor(private readonly userMentionGatewayService: UserMentionsGatewayService) { }

    @Get()
    getUserMention(@Body() userId: string) {
        this.userMentionGatewayService.getUserMention(userId);
    }

    @Post()
    createUserMention(@Body() createUserMentionsRequest: CreateUserMentionRequest) {
        this.userMentionGatewayService.createUserMention(createUserMentionsRequest);
    }

    @Put()
    updateUserMention(@Body() updateUserMentionsRequest: CreateUserMentionRequest) {
        this.userMentionGatewayService.updateUserMention(updateUserMentionsRequest);
    }

    @Delete()
    deleteUserMention(@Body() userId: string) {
        this.userMentionGatewayService.deleteUserMention(userId);
    }
}
