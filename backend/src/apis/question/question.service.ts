import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserRepository } from '../user/entities/user.repository';
import { CreateQuestionInput } from './dto/createQuestion.input';
import { UpdateQuestionInput } from './dto/updateQuestion.input';
import { QuestionEntity } from './entities/question.entity';
import { QuestionRepository } from './entities/question.repository';

@Injectable()
export class QuestionService {
    constructor(
        private readonly questionRepository: QuestionRepository, //
        private readonly userRepository: UserRepository,
    ) {}

    /** 본인이 작성했는지 여부 판별 */
    async checkMyself(
        userID: string, //
        questionID: string,
    ) {
        const user = await this.questionRepository.findByIDandUser(
            userID,
            questionID,
        );

        if (!user) {
            throw new ConflictException(MESSAGES.QUESTION_AUTHORIZATION);
        }

        return user;
    }

    /** 회원 여부 판별 */
    async checkUser(
        userID: string, //
    ) {
        const user = await this.userRepository.findOneByID(userID);

        if (user.userClass.id !== 'USER' && user.userClass.id !== 'AUTHOR') {
            throw new ConflictException(MESSAGES.QUESTION_AUTHORIZATION);
        }

        return user;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 문의 전체 조회 */
    async findAll(): Promise<QuestionEntity[]> {
        return await this.questionRepository.findAll();
    }

    /** 문의 단일 조회 */
    async findOne(
        questionID: string, //
    ): Promise<QuestionEntity> {
        return await this.questionRepository.findOneByID(questionID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createQuestion(
        userID: string, //
        input: CreateQuestionInput,
    ): Promise<QuestionEntity> {
        // 작성 권한 확인
        const user = await this.checkUser(userID);

        return await this.questionRepository.save({
            user,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정

    async updateQuestion(
        userID: string, //
        input: UpdateQuestionInput,
    ): Promise<QuestionEntity> {
        const { id, ...rest } = input;
        const question = await this.questionRepository.findOneByID(id);

        // 문의 존재 여부 확인
        if (!question) throw new ConflictException(MESSAGES.QUESTION_UNVALID);

        // 본인이 작성했는지 여부
        await this.checkMyself(userID, id);

        return await this.questionRepository.save({
            ...question,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        userID: string,
        questionID: string, //
    ): Promise<string> {
        // 본인이 작성했는지 여부
        await this.checkMyself(userID, questionID);

        const result = await this.questionRepository.softDelete(questionID);

        return result.affected
            ? MESSAGES.QUESTION_SOFT_DELETE_SUCCESSED
            : MESSAGES.QUESTION_SOFT_DELETE_FAILED;
    }
}
