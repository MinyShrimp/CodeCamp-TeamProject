import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryRepository } from './entities/novelCategory.repository';

@Resolver()
export class NovelCategoryResolver {
    constructor(
        private readonly novelCategoryRepository: NovelCategoryRepository, //
    ) {}

    private readonly logger = new Logger('Novel Category');

    @Query(
        () => [NovelCategoryEntity], //
        { description: '소설 카테고리 전체 목록 조회' },
    )
    fetchNovelCategorysAll(): Promise<NovelCategoryEntity[]> {
        this.logger.log('fetchNovelCategorysAll');
        return this.novelCategoryRepository.findAll();
    }
}
