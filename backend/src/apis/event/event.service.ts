import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { FileRepository } from '../file/entities/file.repository';
import { UserRepository } from '../user/entities/user.repository';

import { EventEntity } from './entities/event.entity';
import { EventRepository } from './entities/event.repository';
import { CreateEventInput } from './dto/createEvent.input';
import { UpdateEventInput } from './dto/updateEvent.input';

@Injectable()
export class EventService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly fileRepository: FileRepository,
        private readonly eventRepository: EventRepository, //
    ) {}

    /** 관리자 여부 판별 */
    async checkAdmin(
        userID: string, //
    ) {
        const user = await this.userRepository.findOneByID(userID);

        if (user.userClass.id !== 'ADMIN' && user.userClass.id !== 'SUB_ADMIN')
            throw new ConflictException(
                MESSAGES.NOTICE_AUTHORIZATION, //
            );

        return user;
    }

    /** 삭제 확인 */
    async checkValidWithDeleted(
        userID: string, //
        noticeID: string,
    ): Promise<EventEntity> {
        const notice = await this.eventRepository.getIDWithUserWithDeleted(
            userID,
            noticeID,
        );
        const deleteData = await this.eventRepository.find();

        // prettier-ignore
        const nullData = deleteData.map((data) => { return data });

        // prettier-ignore
        if (
            notice === undefined ||
            !nullData.map((target: EventEntity) => { return target.id }).includes(noticeID) &&
            nullData.map((target: EventEntity) => { return target.deleteAt }) === null
        ) {
            throw new ConflictException(MESSAGES.NOTICE_UNVALID);
        }
        return notice;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 모든 이벤트 조회 */
    async findAll(): Promise<EventEntity[]> {
        return await this.eventRepository.findAll();
    }

    /** UUID로 이벤트 조회 */
    async find(
        eventID: string, //
    ): Promise<EventEntity> {
        return await this.eventRepository.findOneByID(eventID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createEvent(
        userID: string, //
        input: CreateEventInput,
    ): Promise<EventEntity> {
        const { fileURLs, ...rest } = input;

        // 관리자 여부 판별
        const user = await this.checkAdmin(userID);

        // 이미지 업로드
        const uploadFiles = await this.fileRepository.findBulkByUrl(fileURLs);

        return await this.eventRepository.save({
            user,
            files: uploadFiles,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정

    async updateEvent(
        userID: string,
        input: UpdateEventInput, //
    ): Promise<EventEntity> {
        const { id, ...rest } = input;
        const event = await this.eventRepository.findOneByID(id);

        // 이벤트 존재 여부 확인
        if (!event) throw new ConflictException(MESSAGES.EVENT_UNVALID);

        // 관리자 여부 판별
        await this.checkAdmin(userID);

        return await this.eventRepository.save({
            ...event,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        userID: string, //
        eventID: string,
    ): Promise<boolean> {
        // 관리자 여부 판별
        await this.checkAdmin(userID);

        const result = await this.eventRepository.softDelete(eventID);
        return result.affected ? true : false;
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    async restore(
        userID: string, //
        eventID: string, //
    ): Promise<boolean> {
        // 관리자 여부 판별
        await this.checkAdmin(userID);

        // 삭제 여부 판별
        await this.checkValidWithDeleted(userID, eventID);

        const result = await this.eventRepository.restore(eventID);
        return result.affected ? true : false;
    }
}
