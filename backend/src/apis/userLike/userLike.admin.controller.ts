// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateUserLikeAdminInput } from './dto/createUserLike.admin.input';
import { UpdateUserLikeAdminInput } from './dto/updateUserLike.admin.input';

import { UserLikeEntity } from './entities/userLike.entity';
import { UserLikeAdminRepository } from './entities/userLike.admin.repository';

@Controller('admin/userLike')
export class UserLikeAdminController {
    constructor(
        private readonly userLikeAdminRepository: UserLikeAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<UserLikeEntity[]> {
        return this.userLikeAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<UserLikeEntity> {
        return this.userLikeAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateUserLikeAdminInput, //
    ): Promise<UserLikeEntity> {
        return this.userLikeAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateUserLikeAdminInput, //
    ): Promise<boolean> {
        const result = await this.userLikeAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.userLikeAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
