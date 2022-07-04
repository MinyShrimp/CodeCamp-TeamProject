import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateQuestionAdminInput } from '../dto/createQuestion.admin.input';
import { UpdateQuestionAdminInput } from '../dto/updateQuestion.admin.input';

import { QuestionEntity } from './question.entity';

@Injectable()
export class QuestionAdminRepository {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'q.id', 'q.title', 'q.contents',
        'q.createAt', 'q.updateAt', 'q.deleteAt',
        'u.id', 'u.email'
    ];

    async findAll(): Promise<QuestionEntity[]> {
        return await this.questionRepository
            .createQueryBuilder('q')
            .select(this._selector)
            .withDeleted()
            .leftJoin('q.user', 'u')
            .orderBy('q.createAt')
            .getMany();
    }

    async findAllNames(): Promise<QuestionEntity[]> {
        return await this.questionRepository
            .createQueryBuilder('q')
            .select(['q.id', 'q.name'])
            .leftJoin('q.user', 'u')
            .orderBy('q.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<QuestionEntity> {
        return await this.questionRepository
            .createQueryBuilder('q')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('q.user', 'u')
            .where('q.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateQuestionAdminInput, //
    ): Promise<QuestionEntity> {
        return await this.questionRepository.save(input);
    }

    async update(
        input: UpdateQuestionAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.questionRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.questionRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
