import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserLikeDto } from '../dto/createUserLike.dto';
import { DeleteUserLikeDto } from '../dto/deleteUserLike.dto';

import { UserLikeEntity } from './userLike.entity';

@Injectable()
export class UserLikeRepository {
    constructor(
        @InjectRepository(UserLikeEntity)
        private readonly userLikeRepository: Repository<UserLikeEntity>,
    ) {}

    async checkOverlap(
        dto: CreateUserLikeDto, //
    ): Promise<UserLikeEntity> {
        return await this.userLikeRepository
            .createQueryBuilder('ul')
            .select(['ul.id', 'ul.fromID', 'ul.toID'])
            .where('ul.fromID=:fromID', { fromID: dto.fromID })
            .andWhere('ul.toID=:toID', { toID: dto.toID })
            .getOne();
    }

    async checkValid(
        dto: DeleteUserLikeDto, //
    ): Promise<UserLikeEntity> {
        return await this.userLikeRepository
            .createQueryBuilder('ul')
            .select(['ul.id', 'ul.fromID'])
            .where('ul.id=:id', { id: dto.userLikeID })
            .andWhere('ul.fromID=:fromID', { fromID: dto.fromID })
            .getOne();
    }

    async save(
        userLike: Partial<Omit<UserLikeEntity, 'id'>>, //
    ): Promise<UserLikeEntity> {
        return await this.userLikeRepository.save(userLike);
    }

    async delete(
        userLikeID: string, //
    ): Promise<DeleteResult> {
        return await this.userLikeRepository.delete({
            id: userLikeID,
        });
    }
}
