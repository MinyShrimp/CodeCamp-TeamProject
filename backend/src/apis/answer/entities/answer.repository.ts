import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { AnswerEntity } from './answer.entity';

@Injectable()
export class AnswerRepository {
    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 전체 조회 */
    async findAll(): Promise<AnswerEntity[]> {
        return await this.answerRepository.find({
            relations: [
                'user',
                'user.userClass',
                'question',
                'question.answer',
                'question.user',
            ],
        });
    }

    /** 문의에 대한 UUID 및 유저 ID 기반 조회  */
    async findByIDandUser(
        userID: string,
        id: string, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository.findOne({
            relations: [
                'user',
                'user.userClass',
                'question',
                'question.answer',
                'question.user',
            ],
            where: { id, user: userID },
        });
    }

    /** 질문 ID 기반 조회 */
    async findOneByQID(
        questionId: string, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository.findOne({
            relations: [
                'user',
                'user.userClass',
                'question',
                'question.answer',
                'question.user',
            ],
            where: { question: questionId },
        });
    }

    /** 답변 ID 기반 조회 */
    async findOneByID(
        id: string, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository.findOne({
            relations: [
                'user',
                'user.userClass',
                'question',
                'question.answer',
                'question.user',
            ],
            where: { id },
        });
    }

    /** 전체 조회(삭제 데이터 포함) */
    async find(): Promise<AnswerEntity[]> {
        return await this.answerRepository.find({
            relations: ['user', 'question'],
            withDeleted: true,
        });
    }

    /** 유저 ID 기반 조회( 삭제 데이터 포함 ) */
    async getIDWithUserWithDeleted(
        userID: string, //
        answerID: string,
    ): Promise<AnswerEntity> {
        return await this.answerRepository
            .createQueryBuilder('answer')
            .select(['answer.id'])
            .withDeleted()
            .leftJoin('answer.user', 'UserEntity')
            .leftJoin('answer.question', 'QuestionEntity')
            .where('UserEntity.id=:userID', { userID: userID })
            .andWhere('answer.id=:answerID', { answerID: answerID })
            .getOne();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<AnswerEntity>, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        answerID: string, //
    ): Promise<UpdateResult> {
        return await this.answerRepository.softDelete(answerID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    async restore(
        answerID: string, //
    ): Promise<UpdateResult> {
        return await this.answerRepository.restore(answerID);
    }
}
