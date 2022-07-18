import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, UpdateResult } from 'typeorm';

import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';

import { NovelDto } from '../dto/novel.dto';
import { FetchNovelsOutput } from '../dto/fetchNovels.output';

import { NovelEntity } from './novel.entity';

@Injectable()
export class NovelRepository {
    constructor(
        @InjectRepository(NovelEntity)
        private readonly novelRepository: Repository<NovelEntity>,
        private readonly connection: Connection,
    ) {}

    private readonly take = 10;

    /**
     * 연재중 작품 갯수 조회
     */
    async getCountIng(): Promise<number> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .where('n.user is not null')
            .where('n.isFinish = 0')
            .getCount();
    }

    /**
     * 연재 중인 작품 조회 ( Page, 최신순 )
     */
    async getPageIngLastOrder(
        page: number, //
    ): Promise<FetchNovelsOutput> {
        const novels = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where('novel.isFinish = 0')
            .orderBy('novel.createAt', 'DESC')
            .take(this.take)
            .skip(this.take * (page - 1))
            .getMany();

        const count = await this.getCountIng();

        return {
            novels: novels,
            count: count,
        };
    }

    /**
     * 연재 중인 작품 조회 ( Page, 좋아요 순 )
     */
    async getPageIngLikeOrder(
        page: number, //
    ): Promise<FetchNovelsOutput> {
        const novels = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where('novel.isFinish = 0')
            .orderBy('novel.likeCount', 'DESC')
            .take(this.take)
            .skip(this.take * (page - 1))
            .getMany();

        const count = await this.getCountIng();

        return {
            novels: novels,
            count: count,
        };
    }

    /**
     * 완결 작품 갯수 조회
     */
    async getCountFin(): Promise<number> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .where('n.user is not null')
            .where('n.isFinish = 1')
            .getCount();
    }

    /**
     * 완결 작품 조회 ( Page, 최신순 )
     */
    async getPageFinLastOrder(
        page: number, //
    ): Promise<FetchNovelsOutput> {
        const novels = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where('novel.isFinish = 1')
            .orderBy('novel.createAt', 'DESC')
            .take(this.take)
            .skip(this.take * (page - 1))
            .getMany();

        const count = await this.getCountFin();

        return {
            novels: novels,
            count: count,
        };
    }

    /**
     * 완결 작품 조회 ( Page, 좋아요 순 )
     */
    async getPageFinLikeOrder(
        page: number, //
    ): Promise<FetchNovelsOutput> {
        const novels = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where('novel.isFinish = 1')
            .orderBy('novel.likeCount', 'DESC')
            .take(this.take)
            .skip(this.take * (page - 1))
            .getMany();

        const count = await this.getCountFin();

        return {
            novels: novels,
            count: count,
        };
    }

    /**
     * 내가 쓴 소설 갯수 조회
     */
    async getMyCount(
        userID: string, //
    ): Promise<number> {
        return await this.novelRepository
            .createQueryBuilder('novel')
            .select(['novel.id', 'user.id'])
            .leftJoin('novel.user', 'user')
            .where('user.id=:id', { id: userID })
            .getCount();
    }

    /**
     * 내가 쓴 소설 목록 조회
     */
    async getMyListPage(dto: {
        page: number;
        userID: string; //
    }): Promise<FetchNovelsOutput> {
        const list = await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.novelIndexs', 'novelIndexs')
            .leftJoinAndSelect('novel.files', 'files')
            .where('user.id=:id', { id: dto.userID })
            .orderBy('novel.createAt', 'DESC')
            .take(this.take)
            .skip(this.take * (dto.page - 1))
            .getMany();

        const count = await this.getMyCount(dto.userID);

        return {
            novels: list,
            count: count,
        };
    }

    /**
     * 내가 쓴 소설 단일 조회
     */
    async getMyDetail(
        dto: NovelDto, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.novelIndexs', 'novelIndexs')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.id=:novelID', { novelID: dto.novelID })
            .andWhere('user.id=:userID', { userID: dto.userID })
            .getOne();
    }

    /**
     * ID 기반 조회
     */
    async getOne(
        novelID: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
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
            .select(['n.id', 'u.id'])
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
            .select(['n.id', 'u.id'])
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
     * 완결로 전환
     */
    async changeFinish(
        novelID: string, //
    ): Promise<UpdateResult> {
        return await this.novelRepository.update(
            { id: novelID },
            { isFinish: true },
        );
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
