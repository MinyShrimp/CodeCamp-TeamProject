import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, IsNull, Not, Repository, UpdateResult } from 'typeorm';

import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';

import { NovelEntity } from './novel.entity';
import { FetchNovelsOutput } from '../dto/fetchNovels.output';

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

    /**
     * 전체 갯수 조회
     */
    async getCount(): Promise<number> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .where('n.user is not null')
            .getCount();
    }

    async getPage(
        page: number, //
    ): Promise<FetchNovelsOutput> {
        const take = 10;

        const novels = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .orderBy('novel.createAt', 'DESC')
            .take(take)
            .skip(take * (page - 1))
            .getMany();

        const count = await this.getCount();

        return {
            novels: novels,
            count: count,
        };
    }

    /**
     * ID 기반 조회
     */
    async getOne(
        novelID: string, //
    ): Promise<NovelEntity> {
        const result = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.novelIndexs', 'novelIndexs')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where(`novelIndexs.isPrivate = 0`)
            .where('novel.id=:novelID', { novelID: novelID })
            .getOne();

        return result;
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
