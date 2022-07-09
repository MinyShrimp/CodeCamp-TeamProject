import { Injectable } from '@nestjs/common';

import { UserRepository } from '../user/entities/user.repository';
import { UserCheckService } from '../user/userCheck.service';

import { NovelCategoryRepository } from '../novelCategory/entities/novelCategory.repository';
import { NovelCategoryCheckService } from '../novelCategory/novelCategoryCheck.service';

import { NovelTagService } from '../novelTag/novelTag.service';

import { NovelEntity } from './entities/novel.entity';
import { NovelRepository } from './entities/novel.repository';
import { CreateNovelInput } from './dto/createNovel.input';

@Injectable()
export class NovelService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userCheckService: UserCheckService,

        private readonly novelCategoryRepository: NovelCategoryRepository,
        private readonly novelCategoryCheckService: NovelCategoryCheckService,

        private readonly novelTagService: NovelTagService,

        private readonly novelRepository: NovelRepository,
    ) {}

    async create(
        userID: string,
        createNovelInput: CreateNovelInput, //
    ): Promise<NovelEntity> {
        const { categoryID, tags, ...input } = createNovelInput;
        console.log(input);

        // 유저 찾기
        const user = await this.userRepository.findOneByID(userID);
        console.log(user);
        this.userCheckService.checkValidUser(user);

        // 카테고리 찾기
        const category = await this.novelCategoryRepository.findOne(categoryID);
        console.log(category);
        this.novelCategoryCheckService.checkValid(category);

        // 태그 찾기
        const tagEntities = await this.novelTagService.create(tags);
        console.log(tagEntities);

        // 저장
        return await this.novelRepository.save({
            user: user,
            novelCategory: category,
            novelTags: tagEntities,
            ...input,
        });
    }
}
