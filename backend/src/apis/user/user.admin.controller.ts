import { Controller, Get, Param } from '@nestjs/common';
import { UserAdminRepository } from './entities/user.admin.repository';
import { UserEntity } from './entities/user.entity';

@Controller('admin')
export class UserAdminController {
    constructor(private readonly userAdminRepository: UserAdminRepository) {}

    @Get('users')
    findAll(): Promise<UserEntity[]> {
        return this.userAdminRepository.findAll();
    }

    @Get('user/:id')
    findOne(
        @Param('id') userID: string, //
    ): Promise<UserEntity> {
        return this.userAdminRepository.findOne(userID);
    }
}
