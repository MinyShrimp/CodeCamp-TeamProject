import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionRepository {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 전체 조회 */
    async findAll(): Promise<QuestionEntity[]> {
        return await this.questionRepository.find({
            relations: ['user', 'user.userClass', 'answer', 'answer.user'],
        });
    }

    /** 문의에 대한 UUID 및 유저 ID 기반 조회  */
    async findByIDandUser(
        userID: string,
        id: string, //
    ): Promise<QuestionEntity> {
        return await this.questionRepository.findOne({
            relations: ['user', 'user.userClass'],
            where: { id, user: userID },
        });
    }

    /** 문의 ID 기반 조회 */
    async findOneByQID(
        id: string, //
    ): Promise<QuestionEntity> {
        return await this.questionRepository.findOne({
            relations: ['user', 'user.userClass', 'answer'],
            where: { id },
        });
    }

    /** 유저ID 기반 문의 조회 */
    async findOneByID(
        userID: string, //
    ): Promise<QuestionEntity[]> {
        return await this.questionRepository.find({
            relations: [
                'user',
                'user.userClass',
                'answer',
                'answer.user',
                'answer.user.userClass',
            ],
            where: { user: userID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<QuestionEntity>, //
    ): Promise<QuestionEntity> {
        return await this.questionRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        questionID: string, //
    ): Promise<UpdateResult> {
        return await this.questionRepository.softDelete(questionID);
    }

    async delete(
        questionID: string, //
    ): Promise<DeleteResult> {
        return await this.questionRepository.delete(questionID);
    }
}
