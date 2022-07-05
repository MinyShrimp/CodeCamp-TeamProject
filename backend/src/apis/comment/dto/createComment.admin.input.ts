import { CommentEntity } from '../entities/comment.entity';
export interface CreateCommentAdminInput extends Omit<CommentEntity, 'id'> {}
