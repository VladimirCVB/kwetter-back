import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminGatewayService } from './admin-gateway.service';
import { CreateAdminRequest } from './dto/create-admin-request.dto';
import { UpdateAdminRequest } from './dto/update-admin-request.dto';

@Controller('admin-gateway')
export class AdminGatewayController {
  constructor(private readonly adminGatewayService: AdminGatewayService) {}

  @Get('/:id')
  getAdmin(@Param('id') userId: string) {
    return this.adminGatewayService.getAdmin(userId);
  }

  @Get('/banned-users/user')
  getBan(@Body() userId: string) {
    return this.adminGatewayService.getBan(userId);
  }

  @Get('/banned-users')
  getBanned() {
    return this.adminGatewayService.getBanned();
  }

  @Post('/create-admin')
  createAdmin(@Body() createAdminRequest: CreateAdminRequest) {
    return this.adminGatewayService.createAdmin(createAdminRequest);
  }

  @Post('/banned-users/create-ban')
  createBan(@Body() createBanRequest: CreateAdminRequest) {
    return this.adminGatewayService.createBan(createBanRequest);
  }

  @Put('/update-admin')
  updateAdmin(@Body() updateAdminRequest: UpdateAdminRequest) {
    return this.adminGatewayService.updateAdmin(updateAdminRequest);
  }

  @Put('/banned-users/update-ban')
  updateBan(@Body() updateBanRequest: UpdateAdminRequest) {
    return this.adminGatewayService.updateBan(updateBanRequest);
  }

  @Delete('/delete-admin')
  deleteAdmin(@Body() userId: string) {
    return this.adminGatewayService.deleteAdmin(userId);
  }

  @Delete('/banned-users/delete-banned')
  deleteBan(@Body() userId: string) {
    return this.adminGatewayService.deleteBan(userId);
  }
}
