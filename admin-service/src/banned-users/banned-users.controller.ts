import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BannedUsersService } from './banned-users.service';
import { CreateBannedUsersDto } from './dtos/create-banned-users.dto';
import { BannedUsers } from './entities/banned-users.entity';

@ApiTags('banned-users')
@Controller('banned-users')
export class BannedUsersController {

    constructor(private readonly bannedUsersService: BannedUsersService) { }

    @ApiOperation({ summary: 'Get all banned-users information' })
    @ApiResponse({ status: 200, description: 'Returned all banned-users' })
    @Get()
    async findAll(): Promise<BannedUsers[]> {
        return this.bannedUsersService.findAll();
    }

    @ApiOperation({ summary: 'Get banned-users by id' })
    @ApiResponse({ status: 200, description: 'Returned banned-users by id' })
    @ApiResponse({ status: 404, description: 'Banned-users not found' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BannedUsers> {
        return this.bannedUsersService.findOne(id);
    }

    @ApiOperation({ summary: 'Create banned-users' })
    @ApiResponse({ status: 201, description: 'Banned-users created' })
    @ApiResponse({ status: 400, description: 'Invalid banned-users' })
    @ApiResponse({ status: 409, description: 'Banned-users already exists' })
    @Post()
    async create(@Body() bannedUsers: CreateBannedUsersDto): Promise<BannedUsers> {
        return this.bannedUsersService.create(bannedUsers);
    }

    @ApiOperation({ summary: 'Update banned-users' })
    @ApiResponse({ status: 200, description: 'Banned-users updated' })
    @ApiResponse({ status: 400, description: 'Invalid banned-users' })
    @ApiResponse({ status: 404, description: 'Banned-users not found' })
    @ApiResponse({ status: 409, description: 'Banned-users already exists' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() bannedUsers: CreateBannedUsersDto,
    ): Promise<BannedUsers> {
        return this.bannedUsersService.update(id, bannedUsers);
    }

    @ApiOperation({ summary: 'Delete banned-users information by id' })
    @ApiResponse({ status: 200, description: 'Banned-users deleted' })
    @ApiResponse({ status: 404, description: 'Banned-users not found' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.bannedUsersService.delete(id);
    }
}
