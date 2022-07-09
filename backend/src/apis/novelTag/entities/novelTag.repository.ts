import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelTagEntity } from './novelTag.entity';

@Injectable()
export class NovelTagRepository {
    constructor(
        @InjectRepository(NovelTagEntity)
        private readonly tagRepository: Repository<NovelTagEntity>,
    ) {}

    async findAll(): Promise<NovelTagEntity[]> {
        return await this.tagRepository
            .createQueryBuilder('t')
            .select(['t.id', 't.name', 'n.id', 'n.title'])
            .leftJoin('t.novels', 'n')
            .getMany();
    }

    async findOneByName(
        name: string, //
    ): Promise<NovelTagEntity> {
        return await this.tagRepository
            .createQueryBuilder('t')
            .select(['t.id', 't.name'])
            .where('t.name=:name', { name: name })
            .getOne();
    }

    async save(
        name: string, //
    ): Promise<NovelTagEntity> {
        return await this.tagRepository.save({
            name: name,
        });
    }
}
