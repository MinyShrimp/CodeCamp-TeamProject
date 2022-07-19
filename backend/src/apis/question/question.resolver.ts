import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';
import { CreateQuestionInput } from './dto/createQuestion.input';
import { UpdateQuestionInput } from './dto/updateQuestion.input';

@Resolver()
export class QuestionResolver {
    constructor(
        private readonly questionService: QuestionService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 문의 전체 조회 */
    @Query(
        () => [QuestionEntity], //
        { description: '모든 문의 조회' },
    )
    async fetchQuestionAll(): Promise<QuestionEntity[]> {
        return await this.questionService.findAll();
    }

    /** 문의ID로 해당 문의 조회 */
    @Query(
        () => QuestionEntity, //
        { description: '문의사항 단일 조회' },
    )
    async fetchQuestion(
        @Args('questionID') questionID: string, //
    ): Promise<QuestionEntity> {
        return await this.questionService.findOne(questionID);
    }

    /** 유저ID로 문의 조회 */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [QuestionEntity], //
        { description: '유저ID로 문의사항 조회' },
    )
    async fetchQuestionByID(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<QuestionEntity[]> {
        return await this.questionService.findByID(currentUser);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => QuestionEntity, //
        { description: '문의 작성' },
    )
    async createQuestion(
        @CurrentUser() currentUser: IPayload, //
        @Args('createQuestionInput') input: CreateQuestionInput,
    ): Promise<QuestionEntity> {
        return await this.questionService.createQuestion(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => QuestionEntity, //
        { description: '문의 수정' },
    )
    async updateQuestion(
        @CurrentUser() currentUser: IPayload, //
        @Args('updateQuestionInput') input: UpdateQuestionInput,
    ): Promise<QuestionEntity> {
        return await this.questionService.updateQuestion(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '문의 삭제' },
    )
    async deleteQuestion(
        @CurrentUser() currentUser: IPayload,
        @Args('questionID') questionID: string, //
    ): Promise<string> {
        return await this.questionService.softDelete(
            currentUser.id,
            questionID,
        );
    }
}
