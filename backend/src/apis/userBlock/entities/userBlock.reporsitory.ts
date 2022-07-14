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

    async checkOverlap(
        dto: CreateUserBlockDto, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository
            .createQueryBuilder('ul')
            .select(['ul.id', 'ul.fromID', 'ul.toID'])
            .where('ul.fromID=:fromID', { fromID: dto.fromID })
            .andWhere('ul.toID=:toID', { toID: dto.toID })
            .getOne();
    }

    async checkValid(
        dto: DeleteUserBlockDto, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository
            .createQueryBuilder('ul')
            .select(['ul.id', 'ul.fromID'])
            .where('ul.id=:id', { id: dto.userBlockID })
            .where('ul.fromID=:fromID', { fromID: dto.fromID })
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
