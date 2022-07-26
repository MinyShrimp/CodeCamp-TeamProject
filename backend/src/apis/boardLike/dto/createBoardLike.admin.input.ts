import { BoardLikeEntity } from '../entities/boardLike.entity';

export interface CreateBoardLikeAdminInput
    extends Omit<BoardLikeEntity, 'id'> {}
