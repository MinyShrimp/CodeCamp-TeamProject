import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserAdminInput } from './dto/updateUser.admin.input';
import { UserAdminRepository } from './entities/user.admin.repository';
import { UserEntity } from './entities/user.entity';

@Controller('admin')
export class UserAdminController {
    constructor(
        private readonly userAdminRepository: UserAdminRepository, //
    ) {}

    @Get('/users')
    findAll(): Promise<UserEntity[]> {
        return this.userAdminRepository.findAll();
    }

    @Get('/user/:id')
    findOne(
        @Param('id') userID: string, //
    ): Promise<UserEntity> {
        return this.userAdminRepository.findOne(userID);
    }

    @Patch('/user')
    async update(
        @Body() input: UpdateUserAdminInput, //
    ): Promise<boolean> {
        const result = await this.userAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/users')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        const results = await this.userAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
