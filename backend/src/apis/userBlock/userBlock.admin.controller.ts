// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateUserBlockAdminInput } from './dto/createUserBlock.admin.input';
import { UpdateUserBlockAdminInput } from './dto/updateUserBlock.admin.input';

import { UserBlockEntity } from './entities/userBlock.entity';
import { UserBlockAdminRepository } from './entities/userBlock.admin.repository';

@Controller('admin/userBlock')
export class UserBlockAdminController {
    constructor(
        private readonly userBlockAdminRepository: UserBlockAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<UserBlockEntity[]> {
        return this.userBlockAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<UserBlockEntity> {
        return this.userBlockAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateUserBlockAdminInput, //
    ): Promise<UserBlockEntity> {
        return this.userBlockAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateUserBlockAdminInput, //
    ): Promise<boolean> {
        const result = await this.userBlockAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.userBlockAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
