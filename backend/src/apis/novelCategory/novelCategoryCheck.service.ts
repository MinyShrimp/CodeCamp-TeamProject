import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { NovelCategoryEntity } from './entities/novelCategory.entity';

@Injectable()
export class NovelCategoryCheckService {
    constructor() {}

    checkValid(
        category: NovelCategoryEntity, //
    ): boolean {
        if (category === null) {
            throw new ConflictException(
                MESSAGES.NOVEL_CATEGORY_FIND_ONE_FAILED, //
            );
        }
        return true;
    }
}
