import { UseGuards } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';
import { Mutation, Query } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { CreateNoticeInput } from './dto/createNotice.input';
import { UpdateNoticeInput } from './dto/updateNotice.input';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

@Resolver()
export class NoticeResolver {
    constructor(
        private readonly noticeService: NoticeService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    @Query(
        () => [NoticeEntity], //
        { description: '모든 공지사항 조회' },
    )
    async fetchNoticesAll(): Promise<NoticeEntity[]> {
        return await this.noticeService.findAll();
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
        () => String, //
        { description: '공지사항 삭제' },
    )
    async deleteNotice(
        @CurrentUser() currentUser: IPayload,
        @Args('noticeID') noticeID: string, //
    ) {
        return await this.noticeService.softDelete(currentUser.id, noticeID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
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
            isSuccess: result,
            contents: result
                ? MESSAGES.NOTICE_RESTORE_SUCCESSED
                : MESSAGES.NOTICE_RESTORE_FAILED,
        });
    }
}
