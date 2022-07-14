import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NovelLikeEntity } from './novelLike.entity';
import { DeleteNovelLikeDto } from '../dto/deleteNovelLike.dto';
import { CreateNovelLikeDto } from '../dto/createNovelLike.dto';

@Injectable()
export class NovelLikeRepository {
    constructor(
        @InjectRepository(NovelLikeEntity)
        private readonly novelLikeRepository: Repository<NovelLikeEntity>,
    ) {}

    async checkValid(
        dto: DeleteNovelLikeDto, //
    ): Promise<NovelLikeEntity> {
        return await this.novelLikeRepository
            .createQueryBuilder('ub')
            .select(['ub.id', 'ub.userID'])
            .where('ub.id=:id', { id: dto.novelLikeID })
            .andWhere('ub.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    async checkOverlap(
        dto: CreateNovelLikeDto, //
    ): Promise<NovelLikeEntity> {
        return await this.novelLikeRepository
            .createQueryBuilder('ub')
            .select(['ub.id', 'ub.userID', 'ub.novelID'])
            .where('ub.userID=:userID', { userID: dto.userID })
            .andWhere('ub.novelID=:novelID', { novelID: dto.novelID })
            .getOne();
    }

    async save(
        novelLike: Partial<Omit<NovelLikeEntity, 'id'>>, //
    ): Promise<NovelLikeEntity> {
        return await this.novelLikeRepository.save(novelLike);
    }

    async delete(
        novelLikeID: string, //
    ): Promise<DeleteResult> {
        return await this.novelLikeRepository.delete({
            id: novelLikeID,
        });
    }
}
