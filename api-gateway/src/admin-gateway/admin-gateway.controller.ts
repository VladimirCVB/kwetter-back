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

  @Get(':id')
  getAdmin(@Param('id') userId: string) {
    this.adminGatewayService.getAdmin(userId);
  }

  @Get()
  getBan(@Body() userId: string) {
    this.adminGatewayService.getBan(userId);
  }

  @Get()
  getBanned() {
    this.adminGatewayService.getBanned();
  }

  @Post()
  createAdmin(@Body() createAdminRequest: CreateAdminRequest) {
    this.adminGatewayService.createAdmin(createAdminRequest);
  }

  @Post()
  createBan(@Body() createBanRequest: CreateAdminRequest) {
    this.adminGatewayService.createBan(createBanRequest);
  }

  @Put()
  updateAdmin(@Body() updateAdminRequest: UpdateAdminRequest) {
    this.adminGatewayService.updateAdmin(updateAdminRequest);
  }

  @Put()
  updateBan(@Body() updateBanRequest: UpdateAdminRequest) {
    this.adminGatewayService.updateBan(updateBanRequest);
  }

  @Delete()
  deleteAdmin(@Body() userId: string) {
    this.adminGatewayService.deleteAdmin(userId);
  }

  @Delete()
  deleteBan(@Body() userId: string) {
    this.adminGatewayService.deleteBan(userId);
  }
}
