import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserInput } from './dto/createUser.input';
import { UserAdminRepository } from './entities/user.admin.repository';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('admin')
export class UserAdminController {
    constructor(
        private readonly userService: UserService, //
        private readonly userAdminRepository: UserAdminRepository,
    ) {}

    @Get('/users')
    getUsers(): Promise<UserEntity[]> {
        return this.userAdminRepository.findAll();
    }

    @Get('/user/names')
    findAllName(): Promise<UserEntity[]> {
        return this.userAdminRepository.findAllName();
    }

    @Get('/user/:id')
    getUser(
        @Param('id') userID: string, //
    ): Promise<UserEntity> {
        return this.userAdminRepository.findOne(userID);
    }

    @Post('/user')
    async createUser(
        @Body() input: CreateUserInput, //
    ) {
        return await this.userService.createUser(input);
    }

    @Delete('/users')
    async bulkDeleteUsers(
        @Body() IDs: Array<string>, //
    ) {
        await this.userAdminRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
