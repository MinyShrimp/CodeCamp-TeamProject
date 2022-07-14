import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

import { UserBlockEntity } from './entities/userBlock.entity';
import { UserBlockService } from './userBlock.service';

@Resolver()
export class UserBlockResolver {
    constructor(
        private readonly userBlockService: UserBlockService, //
    ) {}

    // 선호 작가 등록
    @Mutation(
        () => UserBlockEntity, //
        { description: '선호 작가 등록' },
    )
    createUserLike(
        @CurrentUser() payload: IPayload,
        @Args('userID', { description: '등록할 유저 UUID' }) userID: string,
    ): Promise<UserBlockEntity> {
        return this.userBlockService.create({
            fromID: payload.id,
            toID: userID,
        });
    }

    // 선호 작가 삭제
    @Mutation(
        () => ResultMessage, //
        { description: '선호 작가 삭제' },
    )
    async deleteUserLike(
        @CurrentUser() payload: IPayload,
        @Args('userBlockID', { description: '삭제할 UUID' })
        userBlockID: string,
    ): Promise<ResultMessage> {
        const result = await this.userBlockService.delete({
            fromID: payload.id,
            userBlockID,
        });

        return new ResultMessage({
            id: userBlockID,
            isSuccess: result,
            contents: result ? '삭제 완료' : '삭제 실패',
        });
    }
}
