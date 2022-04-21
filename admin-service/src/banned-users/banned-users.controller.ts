import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannedUsersService } from './banned-users.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@ApiTags('banned-users')
@Controller('banned-users')
export class BannedUsersController {
  constructor(private readonly bannedUsersService: BannedUsersService) {}

  @MessagePattern('ban_created')
  handleBanCreated(data: any) {
    return this.bannedUsersService.handleBanCreated(data.value);
  }

  @MessagePattern('get_ban')
  handleGetBan(data: any) {
    return this.bannedUsersService.handleGetBan(data.value);
  }

  @MessagePattern('get_banned')
  handleGetBanned() {
    return this.bannedUsersService.handleGetBanned();
  }

  @MessagePattern('update_ban')
  handleUpdateBan(data: any) {
    return this.bannedUsersService.handleUpdateBan(data.value);
  }

  @MessagePattern('delete_ban')
  handleDeleteBan(data: any) {
    return this.bannedUsersService.handleDeleteBan(data.value);
  }
}
