import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserAdministratorDto } from 'src/user-Administrator/dtos/create-user-Administrator.dto';
import { UserAdministrator } from 'src/user-Administrator/entities/user-Administrator.entity';
import { UserAdministratorService } from 'src/user-Administrator/user-Administrator.service';

@ApiTags('user-administrator')
@Controller('user-administrator')
export class UserAdministratorController {

    constructor(private readonly userAdministratorService: UserAdministratorService) { }

    @ApiOperation({ summary: 'Get all user-Administrator information' })
    @ApiResponse({ status: 200, description: 'Returned all user-Administrator' })
    @Get()
    async findAll(): Promise<UserAdministrator[]> {
        return this.userAdministratorService.findAll();
    }

    @ApiOperation({ summary: 'Get user-Administrator by id' })
    @ApiResponse({ status: 200, description: 'Returned user-Administrator by id' })
    @ApiResponse({ status: 404, description: 'User-Administrator not found' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserAdministrator> {
        return this.userAdministratorService.findOne(id);
    }

    @ApiOperation({ summary: 'Create user-Administrator' })
    @ApiResponse({ status: 201, description: 'user-Administrator created' })
    @ApiResponse({ status: 400, description: 'Invalid user-Administrator' })
    @ApiResponse({ status: 409, description: 'User-Administrator already exists' })
    @Post()
    async create(@Body() userAdministrator: CreateUserAdministratorDto): Promise<UserAdministrator> {
        return this.userAdministratorService.create(userAdministrator);
    }

    @ApiOperation({ summary: 'Update user-Administrator' })
    @ApiResponse({ status: 200, description: 'user-Administrator updated' })
    @ApiResponse({ status: 400, description: 'Invalid user-Administrator' })
    @ApiResponse({ status: 404, description: 'User-Administrator not found' })
    @ApiResponse({ status: 409, description: 'User-Administrator already exists' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() userAdministrator: CreateUserAdministratorDto,
    ): Promise<UserAdministrator> {
        return this.userAdministratorService.update(id, userAdministrator);
    }

    @ApiOperation({ summary: 'Delete user-Administrator information by id' })
    @ApiResponse({ status: 200, description: 'User-Administrator deleted' })
    @ApiResponse({ status: 404, description: 'User-Administrator not found' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userAdministratorService.delete(id);
    }
}
