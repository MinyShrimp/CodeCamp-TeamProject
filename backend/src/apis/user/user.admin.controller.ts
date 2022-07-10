import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateUserAdminInput } from './dto/updateUser.admin.input';

import { UserEntity } from './entities/user.entity';
import { UserAdminRepository } from './entities/user.admin.repository';

@ApiTags('관리자/회원')
@Controller('admin/user')
export class UserAdminController {
    constructor(
        private readonly userAdminRepository: UserAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<UserEntity[]> {
        return this.userAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') userID: string, //
    ): Promise<UserEntity> {
        return this.userAdminRepository.findOne(userID);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateUserAdminInput, //
    ): Promise<boolean> {
        const result = await this.userAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        const results = await this.userAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
