import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { UserRepository } from '../user/entities/user.repository';
import { QuestionRepository } from '../question/entities/question.repository';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerRepository } from './entities/answer.repository';
import { CreateAnswerInput } from './dto/createAnswer.input';
import { UpdateAnswerInput } from './dto/updateAnswer.input';

@Injectable()
export class AnswerService {
    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly answerRepository: AnswerRepository, //
        private readonly userRepository: UserRepository,
    ) {}

    /** 본인이 작성했는지 여부 판별 */
    async checkMyself(
        userID: string, //
        answerID: string,
    ) {
        const user = await this.answerRepository.findByIDandUser(
            userID,
            answerID,
        );

        if (!user) {
            throw new ConflictException(MESSAGES.ANSWER_AUTHORIZATION);
        }

        return user;
    }

    /** 회원 여부 판별 */
    async checkAdmin(
        userID: string, //
    ) {
        const user = await this.userRepository.findOneByID(userID);

        if (
            user.userClass.id !== 'ADMIN' &&
            user.userClass.id !== 'SUB_ADMIN'
        ) {
            throw new ConflictException(MESSAGES.ANSWER_AUTHORIZATION);
        }

        return user;
    }

    /** 삭제 확인 */
    async checkValidWithDeleted(
        userID: string, //
        answerID: string,
    ): Promise<AnswerEntity> {
        const answer = await this.answerRepository.getIDWithUserWithDeleted(
            userID,
            answerID,
        );
        const deleteData = await this.answerRepository.find();

        // prettier-ignore
        const nullData = deleteData.map((data) => { return data });

        // prettier-ignore
        if (
            answer === undefined ||
            !nullData.map((test) => { return test.id }).includes(answerID) &&
            nullData.map((test) => { return test.deleteAt }) === null
        ) {
            throw new ConflictException(MESSAGES.ANSWER_UNVALID);
        }
        return answer;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 답변 전체 조회 */
    async findAll(): Promise<AnswerEntity[]> {
        return await this.answerRepository.findAll();
    }

    /** 답변 단일 조회 */
    async findOne(
        answerID: string, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository.findOneByID(answerID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createAnswer(
        userID: string, //
        input: CreateAnswerInput,
        questionID: string,
    ): Promise<AnswerEntity> {
        // 작성 권한 확인
        const user = await this.checkAdmin(userID);

        // 문의 존재여부 확인
        const question = await this.questionRepository.findOneByQID(questionID);
        if (!question) throw new ConflictException(MESSAGES.QUESTION_UNVALID);

        const { status, ...rest } = question;

        const isStatus = await this.questionRepository.save({
            ...rest,
            status: true,
        });

        const result = await this.answerRepository.save({
            user,
            question: isStatus,
            ...input,
        });

        await this.questionRepository.save({
            ...rest,
            answer: result,
        });

        return result;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정

    async updateQuestion(
        userID: string, //
        input: UpdateAnswerInput,
    ): Promise<AnswerEntity> {
        const { id, ...rest } = input;

        // 답변 존재여부 확인
        const answer = await this.answerRepository.findOneByID(id);

        // 작성 권한 확인
        await this.checkAdmin(userID);

        // 본인이 작성했는지 여부
        await this.checkMyself(userID, id);

        return await this.answerRepository.save({
            ...answer,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        userID: IPayload,
        answerID: string, //
    ): Promise<boolean> {
        // 본인이 작성했는지 여부
        await this.checkMyself(userID.id, answerID);

        // 해당 답변을 달은 문의 글 찾기
        const answerId = await this.answerRepository.findOneByID(answerID);
        // prettier-ignore
        const question = await this.questionRepository.findOneByQID(answerId.question.id);
        const { answer, ...rest } = question;

        // 답변 삭제
        const result = await this.answerRepository.softDelete(answerID);

        // 문의 글 Status 변경
        await this.questionRepository.save({
            ...question,
            answer: null,
            status: false,
        });

        const isSuccess = result.affected ? true : false;

        return isSuccess;
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    async restore(
        userID: IPayload, //
        answerID: string,
    ): Promise<boolean> {
        // 관리자 여부 판별
        await this.checkAdmin(userID.id);

        // 삭제 여부 판별
        await this.checkValidWithDeleted(userID.id, answerID);

        // 답변 삭제 취소
        const result = await this.answerRepository.restore(answerID);

        // 해당 답변을 달았던 문의의 Status 변경
        const answerData = await this.answerRepository.findOneByID(answerID);
        const questionData = await this.questionRepository.findOneByQID(
            answerData.question.id,
        );
        const { answer, status, ...rest } = questionData;

        await this.questionRepository.save({
            ...rest,
            status: true,
            answer: answerData,
        });

        // -
        const isSuccess = result.affected ? true : false;

        return isSuccess;
    }
}
