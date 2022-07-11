import { Query, Resolver } from '@nestjs/graphql';
import { NovelTagEntity } from './entities/novelTag.entity';
import { NovelTagRepository } from './entities/novelTag.repository';

@Resolver()
export class NovelTagResolver {
    constructor(
        private readonly tagRepository: NovelTagRepository, //
    ) {}

    @Query(
        () => [NovelTagEntity], //
        { description: '태그로 소설 찾기' },
    )
    fetchNovelTagsAll(): Promise<Array<NovelTagEntity>> {
        return this.tagRepository.findAll();
    }
}
