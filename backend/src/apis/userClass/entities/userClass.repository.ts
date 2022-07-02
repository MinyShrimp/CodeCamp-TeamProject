import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClassEntity } from './userClass.entity';

export type CLASSID = 'USER' | 'AUTHOR' | 'SUB_ADMIN' | 'ADMIN';

@Injectable()
export class UserClassRepository {
    constructor(
        @InjectRepository(UserClassEntity)
        private readonly userClassRepository: Repository<UserClassEntity>,
    ) {}

    async getClass(
        id: CLASSID = 'USER', //
    ): Promise<UserClassEntity> {
        return await this.userClassRepository.findOne({
            where: { id },
        });
    }
}
