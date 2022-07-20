import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { FileRepository } from '../file/entities/file.repository';
import { UserRepository } from '../user/entities/user.repository';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeRepository } from './entities/notice.repository';
import { CreateNoticeInput } from './dto/createNotice.input';
import { UpdateNoticeInput } from './dto/updateNotice.input';

@Injectable()
export class NoticeService {
    constructor(
        private readonly noticeRepository: NoticeRepository, //
        private readonly userRepository: UserRepository,
        private readonly fileRepository: FileRepository,
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
    ): Promise<NoticeEntity> {
        const notice = await this.noticeRepository.getIDWithUserWithDeleted(
            userID,
            noticeID,
        );
        const deleteData = await this.noticeRepository.find();

        // prettier-ignore
        const nullData = deleteData.map((data) => { return data });

        // prettier-ignore
        if (
            notice === undefined ||
            !nullData.map((test) => { return test.id }).includes(noticeID) &&
            nullData.map((test) => { return test.deleteAt }) === null
        ) {
            throw new ConflictException(MESSAGES.NOTICE_UNVALID);
        }
        return notice;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 모든 공지 조회 */
    async findAll(): Promise<NoticeEntity[]> {
        return await this.noticeRepository.findAll();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createNotice(
        userID: string, //
        input: CreateNoticeInput,
    ): Promise<NoticeEntity> {
        const { fileURLs, ...rest } = input;

        // 관리자 여부 판별
        const user = await this.checkAdmin(userID);

        // 이미지 업로드
        const uploadFiles = await this.fileRepository.findBulkByUrl(fileURLs);

        return await this.noticeRepository.save({
            user,
            files: uploadFiles,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정

    async updateNotice(
        userID: string,
        input: UpdateNoticeInput, //
    ): Promise<NoticeEntity> {
        const { id, ...rest } = input;
        const notice = await this.noticeRepository.findOneByID(id);

        // 공지사항 존재 여부 확인
        if (!notice) throw new ConflictException(MESSAGES.NOTICE_UNVALID);

        // 관리자 여부 판별
        await this.checkAdmin(userID);

        return await this.noticeRepository.save({
            ...notice,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        userID: string,
        noticeID: string, //
    ): Promise<boolean> {
        // 관리자 여부 판별
        await this.checkAdmin(userID);

        const result = await this.noticeRepository.softDelete(noticeID);
        return result.affected ? true : false;
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    async restore(
        userID: string, //
        noticeID: string, //
    ): Promise<boolean> {
        // 관리자 여부 판별
        await this.checkAdmin(userID);

        // 삭제 여부 판별
        await this.checkValidWithDeleted(userID, noticeID);

        const result = await this.noticeRepository.restore(noticeID);
        return result.affected ? true : false;
    }
}
