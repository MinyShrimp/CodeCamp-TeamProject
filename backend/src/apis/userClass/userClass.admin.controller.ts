import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateUserClassInput } from './dto/createUserClass.input';
import { UserClassAdminRepository } from './entities/userClass.admin.repository';
import { UserClassEntity } from './entities/userClass.entity';

@Controller('admin')
export class UserClassAdminController {
    constructor(
        private readonly userClassRepository: UserClassAdminRepository,
    ) {}

    @Get('user-classes')
    findAll(): Promise<UserClassEntity[]> {
        return this.userClassRepository.findAll();
    }

    @Get('user-class/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<UserClassEntity> {
        return this.userClassRepository.findOne(id);
    }

    @Post('user-class')
    create(
        @Body() input: CreateUserClassInput, //
    ): Promise<UserClassEntity> {
        return this.userClassRepository.create(input);
    }

    @Put('user-class')
    update() {}

    @Delete('user-classes')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.userClassRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
