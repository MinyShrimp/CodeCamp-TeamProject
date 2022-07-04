import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateAnswerAdminInput } from '../dto/createAnswer.admin.input';
import { UpdateAnswerAdminInput } from '../dto/updateAnswer.admin.input';

import { AnswerEntity } from './answer.entity';

@Injectable()
export class AnswerAdminRepository {
    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<AnswerEntity[]> {
        return await this.answerRepository
            .createQueryBuilder('answer')
            .select(this._selector)
            .withDeleted()
            .orderBy('answer.createAt')
            .getMany();
    }

    async findAllNames(): Promise<AnswerEntity[]> {
        return await this.answerRepository
            .createQueryBuilder('answer')
            .select(['answer.id', 'answer.name'])
            .orderBy('')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository
            .createQueryBuilder('answer')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('answer.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateAnswerAdminInput, //
    ): Promise<AnswerEntity> {
        return await this.answerRepository.save(input);
    }

    async update(
        input: UpdateAnswerAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.answerRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.answerRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
