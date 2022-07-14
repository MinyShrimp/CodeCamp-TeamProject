import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserBlockDto } from '../dto/createUserBlock.dto';
import { DeleteUserBlockDto } from '../dto/deleteUserBlock.dto';

import { UserBlockEntity } from './userBlock.entity';

@Injectable()
export class UserBlockRepository {
    constructor(
        @InjectRepository(UserBlockEntity)
        private readonly userBlockRepository: Repository<UserBlockEntity>,
    ) {}

    async checkValid(
        dto: DeleteUserBlockDto, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository
            .createQueryBuilder('ub')
            .select(['ub.id', 'ub.fromID'])
            .where('ub.id=:id', { id: dto.userBlockID })
            .andWhere('ub.fromID=:fromID', { fromID: dto.fromID })
            .getOne();
    }

    async checkOverlap(
        dto: CreateUserBlockDto, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository
            .createQueryBuilder('ub')
            .select(['ub.id', 'ub.fromID', 'ub.toID'])
            .where('ub.fromID=:fromID', { fromID: dto.fromID })
            .andWhere('ub.toID=:toID', { toID: dto.toID })
            .getOne();
    }

    async save(
        userLike: Partial<Omit<UserBlockEntity, 'id'>>, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository.save(userLike);
    }

    async delete(
        userBlockID: string, //
    ): Promise<DeleteResult> {
        return await this.userBlockRepository.delete({
            id: userBlockID,
        });
    }
}
