import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, UpdateResult } from 'typeorm';

import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';
import { PaymentPointEntity } from 'src/apis/paymentPoint/entities/paymentPoint.entity';

import { NovelDto } from '../dto/novel.dto';
import { FetchNovelsOutput } from '../dto/fetchNovels.output';

import { NovelEntity } from './novel.entity';
import { FetchNovelInput } from '../dto/fetchNovel.input';
import { SearchNovelInput } from '../dto/searchNovel.input';

@Injectable()
export class NovelRepository {
    constructor(
        @InjectRepository(NovelEntity)
        private readonly novelRepository: Repository<NovelEntity>,
        @InjectRepository(PaymentPointEntity)
        private readonly paymentPointRepository: Repository<PaymentPointEntity>,
        private readonly connection: Connection,
    ) {}

    private readonly take = 10;

    async getPointPayments(
        dto: NovelDto, //
    ): Promise<NovelIndexEntity[]> {
        const paids = await this.paymentPointRepository
            .createQueryBuilder('pp')
            .withDeleted()
            .andWhere('pp.deletedAt IS NULL')
            .leftJoinAndSelect('pp.status', 'pps')
            .leftJoinAndSelect('pp.user', 'ppu')
            .leftJoinAndSelect('ppu.userClass', 'ppuc')
            .leftJoinAndSelect('pp.novelIndex', 'ppni')
            .leftJoinAndSelect('ppni.novel', 'ppnin')
            .leftJoinAndSelect('ppni.user', 'ppniu')
            .leftJoinAndSelect('ppniu.userClass', 'ppniuc')
            .where('pp.novelIndexID is not null')
            .andWhere('ppu.id=:userID', { userID: dto.userID })
            .andWhere('ppnin.id=:novelID', {
                novelID: dto.novelID,
            })
            .orderBy('pp.createAt', 'ASC')
            .getMany();

        return paids.map((v) => v.novelIndex);
    }

    /**
     * [전체, 카테고리, 연재 주기]별 [연재작품, 완결작품] 목록 조회, page, [최신, 좋아요]순
     */
    async getPage(
        dto: FetchNovelInput, //
        search?: SearchNovelInput,
    ): Promise<FetchNovelsOutput> {
        const category = {
            ALL: '',
            CYCLE: `AND novel.cycle like "%${dto.target}%"`,
            CATEGORY: `AND novelCategory.id = "${dto.target}"`,
        }[dto.type];

        const order = {
            LAST: 'novel.createAt',
            LIKE: 'novel.likeCount',
        }[dto.order];

        const isFinish = {
            ALL: '',
            TRUE: 'AND novel.isFinish = 1',
            FALSE: 'AND novel.isFinish = 0',
        }[dto.isFinish];

        const sType = search
            ? {
                  ALL: `AND (novel.title like "%${search.keyword}%" OR user.nickName like "%${search.keyword}%" OR novelTags.name like "%${search.keyword}%")`,
                  TITLE: `AND novel.title like "%${search.keyword}%"`,
                  NICKNAME: `AND user.nickName like "%${search.keyword}%"`,
                  TAG: `AND novelTags.name like "%${search.keyword}%"`,
              }[search.type]
            : '';

        const query = this.novelRepository
            .createQueryBuilder('novel')
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.files', 'files')
            .where(`novel.user is not null ${category} ${isFinish} ${sType}`)
            .orderBy(order, 'DESC')
            .take(this.take)
            .skip(this.take * (dto.page - 1));

        const count = await query.getCount();
        const novels = await query.getMany();

        return {
            count: count,
            novels: novels,
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
            .andWhere('novel.deleteAt is null')
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
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('user.paymentPoints', 'upp')
            .leftJoinAndSelect('upp.novelIndex', 'uppni')
            .leftJoinAndSelect('uppni.novel', 'uppnin')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.novelIndexs', 'novelIndexs')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.id=:novelID', { novelID: dto.novelID })
            .andWhere('user.id=:userID', { userID: dto.userID })
            .where('uppnin.id=:novelID')
            .orderBy('novelIndexs.createAt', 'DESC')
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
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.novelIndexs', 'novelIndexs')
            .leftJoinAndSelect('novel.novelReviews', 'novelReviews')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where(`novelIndexs.isPrivate = 0`)
            .where('novel.id=:novelID', { novelID: novelID })
            .orderBy('novelIndexs.createAt', 'DESC')
            .getOne();
    }

    /**
     * ID 기반 조회
     */
    async getOneWithDeleted(
        novelID: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('novel')
            .withDeleted()
            .leftJoinAndSelect('novel.user', 'user')
            .leftJoinAndSelect('novel.novelCategory', 'novelCategory')
            .leftJoinAndSelect('novel.novelTags', 'novelTags')
            .leftJoinAndSelect('novel.novelIndexs', 'novelIndexs')
            .leftJoinAndSelect('novel.novelReviews', 'novelReviews')
            .leftJoinAndSelect('novel.files', 'files')
            .where('novel.user is not null')
            .where(`novelIndexs.isPrivate = 0`)
            .where('novel.id=:novelID', { novelID: novelID })
            .orderBy('novelIndexs.createAt', 'DESC')
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
            await queryRunner.commitTransaction();
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
            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
            return result;
        }
    }
}
