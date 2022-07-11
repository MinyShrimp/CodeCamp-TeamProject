// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserClassInput } from './dto/createUserClass.input';
import { UpdateUserClassInput } from './dto/updateUserClass.input';

import { UserClassEntity } from './entities/userClass.entity';
import { UserClassAdminRepository } from './entities/userClass.admin.repository';

@ApiTags('관리자/회원/등급')
@Controller('admin/user-class')
export class UserClassAdminController {
    constructor(
        private readonly userClassRepository: UserClassAdminRepository,
    ) {}

    @Get('/all')
    findAll(): Promise<UserClassEntity[]> {
        return this.userClassRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<string>> {
        const results = await this.userClassRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<UserClassEntity> {
        return this.userClassRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateUserClassInput, //
    ): Promise<UserClassEntity> {
        return this.userClassRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateUserClassInput, //
    ): Promise<boolean> {
        const result = await this.userClassRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.userClassRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
