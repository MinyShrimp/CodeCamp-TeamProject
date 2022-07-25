import { ObjectType, PickType } from '@nestjs/graphql';

import { BoardEntity } from '../entities/board.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class BoardOutput extends PickType(BoardEntity, [
    'id',
    'title',
    'likeCount',
    'dislikeCount',
    'viewCount',
    'createAt',
    'updateAt',
]) {}
