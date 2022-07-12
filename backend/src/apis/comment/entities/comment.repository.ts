import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 모든 댓글 조회
     */
    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository.find({
            relations: ['board', 'user'],
        });
    }

    /**
     *  댓글 ID 기반 조회
     */
    async findOneByComment(
        commentID: string, //
    ): Promise<CommentEntity[]> {
        console.log('여기 레포 =====', commentID);
        return await this.commentRepository.find({
            relations: ['board', 'user', 'parent', 'children'],
            where: { id: commentID },
        });
    }

    /**
     *  보드 ID & 유저 ID 기반 조회
     */

    async findByIDFromComments(
        userID: string, //
    ): Promise<CommentEntity[]> {
        return await this.commentRepository.find({
            relations: ['board', 'user', 'parent', 'children'],
            where: { user: userID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //
    async save(
        entity: Partial<CommentEntity>, //
    ): Promise<CommentEntity> {
        return await this.commentRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        commentID: string, //
    ) {
        return await this.commentRepository.softDelete(commentID);
    }
}
