import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelDonateEntity } from './entities/novelDonate.entity';
import { NovelDonateService } from './novelDonate.service';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class NovelDonateResolver {
    constructor(
        private readonly novelDonateService: NovelDonateService, //
    ) {}

    // 후원작 등록
    @Mutation(
        () => NovelDonateEntity,
        { description: '후원작 등록' }, //
    )
    createNovelDonate(
        @CurrentUser() payload: IPayload,
        @Args({
            name: 'novelID', //
            description: '소설 UUID',
        })
        novelID: string, //
    ): Promise<NovelDonateEntity> {
        return this.novelDonateService.create({
            userID: payload.id,
            novelID: novelID,
        });
    }

    // 후원작 등록 취소
    @Mutation(
        () => ResultMessage,
        { description: '후원작 등록 취소' }, //
    )
    async deleteNovelDonate(
        @CurrentUser() payload: IPayload,
        @Args({
            name: 'novelDonateID', //
            description: '후원작 Entity UUID',
        })
        novelDonateID: string, //
    ): Promise<ResultMessage> {
        const result = await this.novelDonateService.delete({
            userID: payload.id,
            novelDonateID: novelDonateID,
        });

        return new ResultMessage({
            id: novelDonateID,
            isSuccess: result,
            contents: result ? MESSAGES.DELETE_SUCCESS : MESSAGES.DELETE_FAILED,
        });
    }
}
