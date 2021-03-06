import { UseGuards } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';
import { Mutation, Query } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { CreateNoticeInput } from './dto/createNotice.input';
import { UpdateNoticeInput } from './dto/updateNotice.input';

@Resolver()
export class NoticeResolver {
    constructor(
        private readonly noticeService: NoticeService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 공지사항 전체 조회 */
    @Query(
        () => [NoticeEntity], //
        { description: '모든 공지사항 조회' },
    )
    async fetchNoticesAll(): Promise<NoticeEntity[]> {
        return await this.noticeService.findAll();
    }

    /** 공지사항 단일 조회 */
    @Query(
        () => NoticeEntity, //
        { description: 'UUID로 해당 공지사항 조회' },
    )
    async fetchNotice(
        @Args('noticeID') noticeID: string, //
    ): Promise<NoticeEntity> {
        return await this.noticeService.find(noticeID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NoticeEntity, //
        { description: '공지사항 작성' },
    )
    async createNotice(
        @CurrentUser() currentUser: IPayload, //
        @Args('createNoticeInput') input: CreateNoticeInput,
    ): Promise<NoticeEntity> {
        return await this.noticeService.createNotice(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NoticeEntity, //
        { description: '공지사항 수정' },
    )
    async updateNotice(
        @CurrentUser() currentUser: IPayload, //
        @Args('updateNoticeInput') input: UpdateNoticeInput,
    ): Promise<NoticeEntity> {
        return await this.noticeService.updateNotice(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '공지사항 삭제' },
    )
    async deleteNotice(
        @CurrentUser() currentUser: IPayload,
        @Args('noticeID') noticeID: string, //
    ): Promise<ResultMessage> {
        const result = await this.noticeService.softDelete(
            currentUser.id,
            noticeID,
        );
        return new ResultMessage({
            id: noticeID,
            isSuccess: result,
            contents: result
                ? MESSAGES.NOTICE_SOFT_DELETE_SUCCESSED
                : MESSAGES.NOTICE_SOFT_DELETE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '공지사항 삭제 취소' },
    )
    async restoreNotice(
        @CurrentUser() currentUser: IPayload,
        @Args('noticeID') noticeID: string,
    ): Promise<ResultMessage> {
        const result = await this.noticeService.restore(
            currentUser.id,
            noticeID,
        );
        return new ResultMessage({
            id: noticeID,
            isSuccess: result,
            contents: result
                ? MESSAGES.NOTICE_RESTORE_SUCCESSED
                : MESSAGES.NOTICE_RESTORE_FAILED,
        });
    }
}
