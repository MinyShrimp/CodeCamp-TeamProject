import { CommentLikeEntity } from '../entities/commentLike.entity';

export interface CreateCommentLikeAdminInput
    extends Omit<CommentLikeEntity, 'id'> {} //
