import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserMentionRequest } from '../dto/create-user-mention-request.dto';
import { UserMentionsGatewayService } from '../services/user-mentions-gateway.service';

@Controller('user-mentions-gateway')
@UseGuards(JwtAuthGuard)
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
    return this.userMentionGatewayService.createUserMention(
      createUserMentionsRequest,
    );
  }

  @Delete('/delete-mention/:id')
  deleteUserMention(@Param('id') id: string) {
    return this.userMentionGatewayService.deleteUserMention(id);
  }
}
