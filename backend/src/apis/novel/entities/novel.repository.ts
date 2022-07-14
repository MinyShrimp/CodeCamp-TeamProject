import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';
import { Connection, Repository, UpdateResult } from 'typeorm';
import { UpdateNovelInput } from '../dto/updateNovel.input';

import { NovelEntity } from './novel.entity';

@Injectable()
export class NovelRepository {
    constructor(
        @InjectRepository(NovelEntity)
        private readonly novelRepository: Repository<NovelEntity>,
        private readonly connection: Connection,
    ) {}

    private readonly _selector = [
        'novel.id',
        'novel.title',
        'novel.description',
        'novel.likeCount',
        'novel.viewCount',
        'novel.createAt',
        'novel.updateAt',
    ];

    async getPage(
        page: number, //
    ): Promise<NovelEntity[]> {
        const take = 10;

        return await this.novelRepository
            .createQueryBuilder('novel')
            .select([
                ...this._selector,
                'user.id',
                'user.nickName',
                'class.id',
                'category.id',
                'category.name',
                'tags.id',
                'tags.name',
                'files.id',
                'files.url',
            ])
            .leftJoin('novel.user', 'user')
            .leftJoin('user.userClass', 'class')
            .leftJoin('novel.novelCategory', 'category')
            .leftJoin('novel.novelTags', 'tags')
            .leftJoin('novel.files', 'files')
            .take(take)
            .skip(take * (page - 1))
            .where('novel.user is not NULL')
            .orderBy('novel.createAt', 'DESC')
            .getMany();
    }

    /**
     * ID 기반 조회
     */
    async getOne(
        novelID: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('novel')
            .select(this._selector)
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('novel.novelCategory', 'category')
            .leftJoinAndSelect('novel.novelTags', 'tags')
            .leftJoinAndSelect('novel.novelIndexs', 'indexs')
            .leftJoinAndSelect('novel.novelReviews', 'reviews')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .andWhere('novel.id=:id', { id: novelID })
            .getOne();
    }

    /**
     * ID 기반 조회 ( Only ID )
     */
    async getOnlyID(
        novelID: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .select(['n.id'])
            .where('n.id=:id', { id: novelID })
            .getOne();
    }

    /**
     * 회원 ID + 소설 ID 기반 조회 ( Only ID )
     */
    async getOneWithUser(
        userID: string,
        novelID: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .select(['n.id'])
            .leftJoin('n.user', 'u')
            .where('n.id=:novelID', { novelID: novelID })
            .andWhere('u.id=:userID', { userID: userID })
            .getOne();
    }

    /**
     * 회원 ID + 소설 ID 기반 조회 ( Only ID, 삭제 포함 )
     */
    async getOneWithUserWithDeleted(
        userID: string,
        novelID: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .select(['n.id'])
            .withDeleted()
            .leftJoin('n.user', 'u')
            .where('n.id=:novelID', { novelID: novelID })
            .andWhere('u.id=:userID', { userID: userID })
            .getOne();
    }

    /**
     * 전체 갯수 조회
     */
    async getCount(): Promise<number> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .where('n.user is not null')
            .getCount();
    }

    /**
     * 생성
     */
    create(
        novel: Partial<Omit<NovelEntity, 'id'>>, //
    ): NovelEntity {
        return this.novelRepository.create(novel);
    }

    /**
     * 저장
     */
    async save(
        novel: Partial<Omit<NovelEntity, 'id'>>, //
    ): Promise<NovelEntity> {
        return await this.novelRepository.save(novel);
    }

    /**
     * 수정
     */
    async update(
        novel: Partial<NovelEntity>, //
    ): Promise<NovelEntity> {
        return await this.novelRepository.save(novel);
    }

    /**
     * 삭제 취소
     *
     * 소설의 자식 테이블인
     * 소설_인덱스도 삭제 취소 함.
     */
    async restore(
        novelID: string, //
    ): Promise<UpdateResult> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let result = undefined;
        try {
            await queryRunner.manager.restore(NovelIndexEntity, {
                novel: { id: novelID },
            });
            result = await queryRunner.manager.restore(NovelEntity, {
                id: novelID,
            });
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
            return result;
        }
    }

    /**
     * 삭제 ( Soft )
     *
     * 소설의 자식 테이블인
     * 소설_인덱스도 삭제 함.
     */
    async delete(
        novelID: string, //
    ): Promise<UpdateResult> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let result = undefined;
        try {
            await queryRunner.manager.softDelete(NovelIndexEntity, {
                novel: { id: novelID },
            });
            result = await queryRunner.manager.softDelete(NovelEntity, {
                id: novelID,
            });
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
            return result;
        }
    }
}
