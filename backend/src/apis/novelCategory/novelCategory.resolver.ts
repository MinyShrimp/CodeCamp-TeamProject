import { Query, Resolver } from '@nestjs/graphql';
import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryRepository } from './entities/novelCategory.repository';

@Resolver()
export class NovelCategoryResolver {
    constructor(
        private readonly novelCategoryRepository: NovelCategoryRepository, //
    ) {}

    @Query(
        () => [NovelCategoryEntity], //
        { description: '소설 카테고리 전체 목록 조회' },
    )
    fetchNovelCategorysAll(): Promise<NovelCategoryEntity[]> {
        return this.novelCategoryRepository.findAll();
    }
}
