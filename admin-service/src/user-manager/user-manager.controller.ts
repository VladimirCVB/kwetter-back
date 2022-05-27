import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserManagerService } from './user-manager.service';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('user-manager')
@Controller('user-manager')
export class UserManagerController {
  constructor(private readonly userManagerService: UserManagerService) {}

  @MessagePattern('admin_created')
  handleAdminCreated(data: any) {
    return this.userManagerService.handleAdminCreated(data.value);
  }

  @MessagePattern('get_admin')
  handleGetAdmin(user_id: string) {
    return this.userManagerService.handleGetAdmin(user_id);
  }

  @MessagePattern('update_admin')
  handleUpdateAdmin(data: any) {
    return this.userManagerService.handleUpdateAdmin(data.value);
  }

  @MessagePattern('delete_admin')
  handleDeleteAdmin(data: any) {
    return this.userManagerService.handleDeleteAdmin(data.value);
  }
}
