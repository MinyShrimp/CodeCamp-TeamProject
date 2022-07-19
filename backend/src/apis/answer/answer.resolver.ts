import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './dto/createAnswer.input';
import { UpdateAnswerInput } from './dto/updateAnswer.input';

@Resolver()
export class AnswerResolver {
    constructor(
        private readonly answerService: AnswerService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 답변 전체 조회 */
    @Query(
        () => [AnswerEntity], //
        { description: '모든 답변 조회' },
    )
    async fetchAnswerAll(): Promise<AnswerEntity[]> {
        return await this.answerService.findAll();
    }

    /** 문의ID로 해당 문의에 대한 답변 조회 */
    @Query(
        () => AnswerEntity, //
        { description: '답변 단일 조회' },
    )
    async fetchAnswer(
        @Args('answerID') answerID: string, //
    ): Promise<AnswerEntity> {
        return await this.answerService.findOne(answerID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => AnswerEntity, //
        { description: '답변 작성' },
    )
    async createAnswer(
        @CurrentUser() currentUser: IPayload, //
        @Args('createAnswerInput') input: CreateAnswerInput,
        @Args('questionID') questionID: string,
    ): Promise<AnswerEntity> {
        return await this.answerService.createAnswer(
            currentUser.id,
            input,
            questionID,
        );
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => AnswerEntity, //
        { description: '답변 수정' },
    )
    async updateAnswer(
        @CurrentUser() currentUser: IPayload, //
        @Args('updateAnswerInput') input: UpdateAnswerInput,
    ): Promise<AnswerEntity> {
        return await this.answerService.updateQuestion(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '답변 삭제' },
    )
    async deleteAnswer(
        @CurrentUser() currentUser: IPayload,
        @Args('answerID') answerID: string, //
    ): Promise<ResultMessage> {
        const result = await this.answerService.softDelete(
            currentUser,
            answerID,
        );
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.ANSWER_SOFT_DELETE_SUCCESSED
                : MESSAGES.ANSWER_SOFT_DELETE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '답변 삭제 취소' },
    )
    async restoreAnswer(
        @CurrentUser() currentUser: IPayload, //
        @Args('answerID') answerID: string,
    ): Promise<ResultMessage> {
        const result = await this.answerService.restore(currentUser, answerID);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.ANSWER_RESTORE_SUCCESSED
                : MESSAGES.ANSWER_RESTORE_FAILED,
        });
    }
}
