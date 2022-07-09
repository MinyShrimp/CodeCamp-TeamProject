import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryRepository } from './entities/novelCategory.repository';

@Injectable()
export class NovelCategoryService {
    constructor(
        private readonly categoryRepository: NovelCategoryRepository, //
    ) {}

    async checkValid(
        categoryID: string, //
    ): Promise<NovelCategoryEntity> {
        const category = await this.categoryRepository.findOne(categoryID);

        if (category === null) {
            throw new ConflictException(
                MESSAGES.NOVEL_CATEGORY_FIND_ONE_FAILED, //
            );
        }

        return category;
    }
}
