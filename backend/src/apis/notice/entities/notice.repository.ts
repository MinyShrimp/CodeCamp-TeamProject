import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { NoticeEntity } from './notice.entity';

@Injectable()
export class NoticeRepository {
    constructor(
        @InjectRepository(NoticeEntity)
        private readonly noticeRepository: Repository<NoticeEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 전체 조회 (삭제 데이터 포함X) */
    async findAll(): Promise<NoticeEntity[]> {
        return await this.noticeRepository.find({
            relations: ['user', 'user.userClass', 'files'],
            order: { createAt: 'DESC' },
        });
    }

    /** 전체 조회(삭제 데이터 포함) */
    async find(): Promise<NoticeEntity[]> {
        return await this.noticeRepository.find({
            relations: ['user', 'user.userClass', 'files'],
            withDeleted: true,
        });
    }

    async findOneByID(
        id: string, //
    ): Promise<NoticeEntity> {
        return await this.noticeRepository
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.user', 'user')
            .leftJoinAndSelect('n.files', 'file')
            .where('n.id=:id', { id })
            .orderBy('n.createAt')
            .getOne();
    }

    /** 유저 ID 기반 조회( 삭제 데이터 포함 ) */
    async getIDWithUserWithDeleted(
        userID: string, //
        noticeID: string,
    ): Promise<NoticeEntity> {
        return await this.noticeRepository
            .createQueryBuilder('notice')
            .select(['notice.id'])
            .withDeleted()
            .leftJoin('notice.user', 'UserEntity')
            .where('UserEntity.id=:userID', { userID: userID })
            .andWhere('notice.id=:noticeID', { noticeID: noticeID })
            .getOne();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<NoticeEntity>, //
    ): Promise<NoticeEntity> {
        return await this.noticeRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        noticeID: string, //
    ): Promise<UpdateResult> {
        return await this.noticeRepository.softDelete(noticeID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    async restore(
        noticeID: string, //
    ): Promise<UpdateResult> {
        return await this.noticeRepository.restore(noticeID);
    }
}
