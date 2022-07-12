import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelCategoryEntity } from './novelCategory.entity';

@Injectable()
export class NovelCategoryRepository {
    constructor(
        @InjectRepository(NovelCategoryEntity)
        private readonly categoryRepository: Repository<NovelCategoryEntity>,
    ) {}

    async findAll(): Promise<NovelCategoryEntity[]> {
        return await this.categoryRepository.find({});
    }

    async findOne(
        categoryID: string, //
    ): Promise<NovelCategoryEntity> {
        return await this.categoryRepository
            .createQueryBuilder('c')
            .select(['c.id', 'c.name'])
            .where('c.id=:id', { id: categoryID })
            .getOne();
    }
}
