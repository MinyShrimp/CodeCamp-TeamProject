import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserClassInput } from '../dto/createUserClass.input';
import { UpdateUserClassInput } from '../dto/updateUserClass.input';
import { UserClassEntity } from './userClass.entity';

@Injectable()
export class UserClassAdminRepository {
    constructor(
        @InjectRepository(UserClassEntity)
        private readonly userClassRepository: Repository<UserClassEntity>,
    ) {}

    private readonly _selector = ['class.id', 'class.description'];

    async findAll(): Promise<UserClassEntity[]> {
        return await this.userClassRepository
            .createQueryBuilder('class')
            .select(this._selector)
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<UserClassEntity> {
        return await this.userClassRepository
            .createQueryBuilder('class')
            .select(this._selector)
            .where('class.id=:id', { id: id })
            .getOne();
    }

    async findAllNames(): Promise<UserClassEntity[]> {
        return await this.userClassRepository
            .createQueryBuilder('class')
            .select(['class.id'])
            .getMany();
    }

    async create(
        input: CreateUserClassInput, //
    ): Promise<UserClassEntity> {
        return await this.userClassRepository.save({
            ...input,
        });
    }

    async update(
        input: UpdateUserClassInput, //
    ): Promise<UpdateResult> {
        const { originID, ...updateInfo } = input;

        return await this.userClassRepository.update(
            { id: input.originID },
            { ...updateInfo },
        );
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.userClassRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
