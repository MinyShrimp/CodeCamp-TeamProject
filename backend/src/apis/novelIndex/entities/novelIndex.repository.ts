import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateNovelIndexInput } from '../dto/updateNovelIndex.input';
import { NovelIndexEntity } from './novelIndex.entity';

@Injectable()
export class NovelIndexRepository {
    constructor(
        @InjectRepository(NovelIndexEntity)
        private readonly indexRepository: Repository<NovelIndexEntity>,
    ) {}

    /**
     * 마지막 인덱스 가져오기
     */
    async getLastIndex(
        userID: string,
        novelID: string, //
    ): Promise<number> {
        const index = await this.indexRepository
            .createQueryBuilder('i')
            .select(['i.index'])
            .leftJoin('i.user', 'u')
            .leftJoin('i.novel', 'n')
            .where('u.id=:userID', { userID: userID })
            .andWhere('n.id=:novelID', { novelID: novelID })
            .orderBy('i.index', 'DESC')
            .getOne();

        return index === undefined ? 1 : index.index + 1;
    }

    /**
     * 유저 ID + 소설 ID 기반 조회 ( Only ID )
     */
    async getOnlyIDWithUser(
        userID: string,
        novelIndexID: string, //
    ): Promise<NovelIndexEntity> {
        return await this.indexRepository
            .createQueryBuilder('i')
            .select(['i.id'])
            .leftJoin('i.user', 'u')
            .where('u.id=:userID', { userID: userID })
            .andWhere('i.id=:novelIndexID', { novelIndexID: novelIndexID })
            .getOne();
    }

    /**
     * 유저 ID + 소설 ID 기반 조회 ( Only ID, 삭제 포함 )
     */
    async getOnlyIDWithUserWithDeleted(
        userID: string,
        novelIndexID: string, //
    ): Promise<NovelIndexEntity> {
        return await this.indexRepository
            .createQueryBuilder('i')
            .select(['i.id'])
            .withDeleted()
            .leftJoin('i.user', 'u')
            .where('u.id=:userID', { userID: userID })
            .andWhere('i.id=:novelIndexID', { novelIndexID: novelIndexID })
            .getOne();
    }

    /**
     * ID 기반 조회
     */
    async getOne(
        novelIndexID: string, //
    ): Promise<NovelIndexEntity> {
        return await this.indexRepository
            .createQueryBuilder('i')
            .select([
                'i.id',
                'i.title',
                'i.contents',
                'i.index',
                'i.star',
                'i.viewCount',
                'i.createAt',
                'i.updateAt',
            ])
            .leftJoinAndSelect('i.user', 'u')
            .leftJoinAndSelect('i.novel', 'n')
            .leftJoinAndSelect('i.novelIndexReviews', 'r')
            .where('i.id=:id', { id: novelIndexID })
            .getOne();
    }

    /**
     * 저장
     */
    async save(
        input: Partial<Omit<NovelIndexEntity, 'id'>>, //
    ): Promise<NovelIndexEntity> {
        return await this.indexRepository.save(input);
    }

    /**
     * 수정
     */
    async update(
        input: Partial<Omit<NovelIndexEntity, 'id'>> &
            Pick<NovelIndexEntity, 'id'>, //
    ): Promise<NovelIndexEntity> {
        return await this.indexRepository.save(input);
    }

    /**
     * 삭제 취소
     */
    async restore(
        novelIndexID: string, //
    ): Promise<UpdateResult> {
        return await this.indexRepository.restore(novelIndexID);
    }

    /**
     * 삭제 ( Soft )
     */
    async delete(
        novelIndexID: string, //
    ): Promise<DeleteResult> {
        return await this.indexRepository.softDelete(novelIndexID);
    }
}