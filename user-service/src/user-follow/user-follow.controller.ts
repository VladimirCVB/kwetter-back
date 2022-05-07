import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserFollowService } from './user-follow.service';

@ApiTags('user-follow')
@Controller('user-follow')
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}

  @MessagePattern('get_user_follow_by_id')
  handleGetUserFollow(data: any) {
    return this.userFollowService.handleGetUserFollow(data.value);
  }

  @MessagePattern('user_follow_created')
  handleCreateUserFollow(data: any) {
    return this.userFollowService.handleCreateUserFollow(data.value);
  }

  // @MessagePattern('update_user_follow')
  // handleUpdateUserFollow(data: any) {
  //   this.userFollowService.handleUpdateUserFollow(data.value[0], data.value[1]);
  // }

  @MessagePattern('delete_user_follow')
  handleDeleteUserFollow(data: any) {
    return this.userFollowService.handleDeleteUserFollow(data.value);
  }
}
