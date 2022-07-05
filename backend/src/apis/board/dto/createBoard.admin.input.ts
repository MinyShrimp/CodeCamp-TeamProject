import { BoardEntity } from '../entities/board.entity';
export interface CreateBoardAdminInput extends Omit<BoardEntity, 'id'> {}
