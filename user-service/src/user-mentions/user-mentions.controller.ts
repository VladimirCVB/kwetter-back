import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserMentionsService } from './user-mentions.service';

@ApiTags('user-mentions')
@Controller('user-mentions')
export class UserMentionsController {
  constructor(private readonly userMentionService: UserMentionsService) {}

  @EventPattern('get_user_mention_by_id')
  handleGetUserMention(data: any) {
    this.userMentionService.handleGetUserMention(data.value);
  }

  @EventPattern('user_mention_created')
  handleCreateUserMention(data: any) {
    this.userMentionService.handleCreateUserMention(data.value);
  }

  // @EventPattern('update_user_mention')
  // handleUpdateUserMention(data: any) {
  //   this.userMentionService.handleUpdateUserMention(data.value[0], data.value[1]);
  // }

  @EventPattern('delete_user_mention')
  handleDeleteUserMention(data: any) {
    this.userMentionService.handleDeleteUserMention(data.value);
  }
}
