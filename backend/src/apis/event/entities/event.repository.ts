import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { EventEntity } from './event.entity';

@Injectable()
export class EventRepository {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 전체 조회 (삭제 데이터 포함X) */
    async findAll(): Promise<EventEntity[]> {
        return await this.eventRepository.find({
            relations: ['user', 'user.userClass', 'files'],
            order: { createAt: 'DESC' },
        });
    }

    /** 전체 조회(삭제 데이터 포함) */
    async find(): Promise<EventEntity[]> {
        return await this.eventRepository.find({
            relations: ['user', 'user.userClass', 'files'],
            withDeleted: true,
        });
    }

    /** ID 기반 조회 */
    async findOneByID(
        id: string, //
    ): Promise<EventEntity> {
        return await this.eventRepository.findOne({
            relations: ['user', 'user.userClass', 'files'],
            where: { id },
        });
    }

    /** 유저 ID 기반 조회( 삭제 데이터 포함 ) */
    async getIDWithUserWithDeleted(
        userID: string, //
        eventID: string,
    ): Promise<EventEntity> {
        return await this.eventRepository
            .createQueryBuilder('event')
            .select(['event.id'])
            .withDeleted()
            .leftJoin('event.user', 'UserEntity')
            .where('UserEntity.id=:userID', { userID: userID })
            .andWhere('event.id=:eventID', { eventID: eventID })
            .getOne();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<EventEntity>, //
    ): Promise<EventEntity> {
        return await this.eventRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        eventID: string, //
    ): Promise<UpdateResult> {
        return await this.eventRepository.softDelete(eventID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    async restore(
        eventID: string, //
    ): Promise<UpdateResult> {
        return await this.eventRepository.restore(eventID);
    }
}
