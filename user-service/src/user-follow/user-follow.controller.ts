import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserFollowService } from './user-follow.service';

@ApiTags('user-follow')
@Controller('user-follow')
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}

  @EventPattern('get_user_follow_by_id')
  handleGetUserFollow(data: any) {
    this.userFollowService.handleGetUserFollow(data.value);
  }

  @EventPattern('user_follow_created')
  handleCreateUserFollow(data: any) {
    this.userFollowService.handleCreateUserFollow(data.value);
  }

  // @EventPattern('update_user_follow')
  // handleUpdateUserFollow(data: any) {
  //   this.userFollowService.handleUpdateUserFollow(data.value[0], data.value[1]);
  // }

  @EventPattern('delete_user_follow')
  handleDeleteUserFollow(data: any) {
    this.userFollowService.handleDeleteUserFollow(data.value);
  }
}
