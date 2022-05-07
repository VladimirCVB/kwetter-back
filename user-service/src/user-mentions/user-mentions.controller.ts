import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserMentionsService } from './user-mentions.service';

@ApiTags('user-mentions')
@Controller('user-mentions')
export class UserMentionsController {
  constructor(private readonly userMentionService: UserMentionsService) {}

  @MessagePattern('get_user_mention_by_id')
  handleGetUserMention(data: any) {
    return this.userMentionService.handleGetUserMention(data.value);
  }

  @MessagePattern('user_mention_created')
  handleCreateUserMention(data: any) {
    return this.userMentionService.handleCreateUserMention(data.value);
  }

  // @MessagePattern('update_user_mention')
  // handleUpdateUserMention(data: any) {
  //   this.userMentionService.handleUpdateUserMention(data.value[0], data.value[1]);
  // }

  @MessagePattern('delete_user_mention')
  handleDeleteUserMention(data: any) {
    return this.userMentionService.handleDeleteUserMention(data.value);
  }
}
