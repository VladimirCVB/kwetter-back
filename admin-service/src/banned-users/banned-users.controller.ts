import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannedUsersService } from './banned-users.service';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('banned-users')
@Controller('banned-users')
export class BannedUsersController {
  constructor(private readonly bannedUsersService: BannedUsersService) {}

  @EventPattern('ban_created')
  handleBanCreated(data: any) {
    this.bannedUsersService.handleBanCreated(data.value);
  }

  @EventPattern('get_ban')
  handleGetBan(data: any) {
    this.bannedUsersService.handleGetBan(data.value);
  }

  @EventPattern('get_banned')
  handleGetBanned() {
    this.bannedUsersService.handleGetBanned();
  }

  @EventPattern('update_ban')
  handleUpdateBan(data: any) {
    this.bannedUsersService.handleUpdateBan(data.value);
  }

  @EventPattern('delete_ban')
  handleDeleteBan(data: any) {
    this.bannedUsersService.handleDeleteBan(data.value);
  }
}
