import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDataDto } from './dtos/create-user-data.dto';
import { UserData } from './entities/user-data.entity';
import { UserDataService } from './user-data.service';

@ApiTags('user-data')
@Controller('user-data')
export class UserDataController {

    constructor(private readonly userDataService: UserDataService) { }

    @ApiOperation({ summary: 'Get all user-data information' })
    @ApiResponse({ status: 200, description: 'Returned all user-data' })
    @Get()
    async findAll(): Promise<UserData[]> {
        return this.userDataService.findAll();
    }

    @ApiOperation({ summary: 'Get user-data by id' })
    @ApiResponse({ status: 200, description: 'Returned user-data by id' })
    @ApiResponse({ status: 404, description: 'User-data not found' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserData> {
        return this.userDataService.findOne(id);
    }

    @ApiOperation({ summary: 'Create user-data' })
    @ApiResponse({ status: 201, description: 'User-data created' })
    @ApiResponse({ status: 400, description: 'Invalid user-data' })
    @ApiResponse({ status: 409, description: 'User-data already exists' })
    @Post()
    async create(@Body() userData: CreateUserDataDto): Promise<UserData> {
        return this.userDataService.create(userData);
    }

    @ApiOperation({ summary: 'Update user-data' })
    @ApiResponse({ status: 200, description: 'User-data updated' })
    @ApiResponse({ status: 400, description: 'Invalid user-data' })
    @ApiResponse({ status: 404, description: 'User-data not found' })
    @ApiResponse({ status: 409, description: 'User-data already exists' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() userData: CreateUserDataDto,
    ): Promise<UserData> {
        return this.userDataService.update(id, userData);
    }

    @ApiOperation({ summary: 'Delete user-data information by id' })
    @ApiResponse({ status: 200, description: 'User-data deleted' })
    @ApiResponse({ status: 404, description: 'User-data not found' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userDataService.delete(id);
    }
}
