import { Injectable } from '@nestjs/common';
import { NovelTagEntity } from './entities/novelTag.entity';
import { NovelTagRepository } from './entities/novelTag.repository';

@Injectable()
export class NovelTagService {
    constructor(
        private readonly tagRepository: NovelTagRepository, //
    ) {}

    async create(
        tags: Array<string>, //
    ): Promise<Array<NovelTagEntity>> {
        const tagNames = tags
            .map((tag) => tag.replace('#', ''))
            .filter((tag) => tag !== '');

        return (await Promise.all(
            tagNames.map((tag) => {
                return new Promise((resolve) => {
                    this.tagRepository.findOneByName(tag).then((res) => {
                        if (res) {
                            resolve(res);
                        } else {
                            this.tagRepository.save(tag).then((res) => {
                                resolve(res);
                            });
                        }
                    });
                });
            }),
        )) as Array<NovelTagEntity>;
    }
}
