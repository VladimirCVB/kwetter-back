import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserManagerService } from './user-manager.service';
import { EventPattern } from '@nestjs/microservices';

@ApiTags('user-manager')
@Controller('user-manager')
export class UserManagerController {
  constructor(private readonly userManagerService: UserManagerService) {}

  
  @EventPattern('admin_created')
  handleAdminCreated(data: any){
    this.userManagerService.handleAdminCreated(data.value);
  }

  @EventPattern('get_admin')
  handleGetAdmin(data: any){
    this.userManagerService.handleGetAdmin(data.value);
  }

  @EventPattern('update_admin')
  handleUpdateAdmin(data: any){
    this.userManagerService.handleUpdateAdmin(data.value);
  }

  @EventPattern('delete_admin')
  handleDeleteAdmin(data: any){
    this.userManagerService.handleDeleteAdmin(data.value);
  }
}
