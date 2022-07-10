// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { UserLikeEntity } from './entities/userLike.entity';
import { UserLikeAdminRepository } from './entities/userLike.admin.repository';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('관리자/회원/선호 작가')
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

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.userLikeAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
