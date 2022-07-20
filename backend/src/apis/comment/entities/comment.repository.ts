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

    private readonly _selector = [
        'cm.id',
        'cm.contents',
        'cm.likeCount',
        'cm.dislikeCount',
        'cm.createAt',
        'cm.updateAt',
    ];

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
            relations: [
                'board',
                'user',
                'parent',
                'children',
                'children.children',
            ],
            where: { id: commentID },
        });
    }

    /**
     * 댓글 ID 기반 조회
     */
    async findOneByCommentOnlyOne(
        commentID: string, //
    ): Promise<CommentEntity> {
        return await this.commentRepository.findOne({
            relations: ['user', 'board', 'parent', 'children'],
            where: { id: commentID },
        });
    }

    /**
     *  유저 ID 기반 조회
     */

    async findByIDFromComments(
        userID: string, //
    ): Promise<CommentEntity[]> {
        return await this.commentRepository.find({
            relations: ['board', 'user', 'parent', 'children'],
            where: { user: userID },
        });
    }

    /**
     * 보드ID 기반 조회
     */
    // async findByBoardIDFromComment(
    //     boardID: string, //
    // ): Promise<CommentEntity[]> {
    //     return await this.commentRepository.find({
    //         relations: ['board', 'user', 'parent', 'children'],
    //         where: { board: boardID },
    //     });
    // }

    // async findByBoardIDFromComment(
    //     boardID: string, //
    // ): Promise<CommentEntity[]> {
    //     return await this.commentRepository
    //         .createQueryBuilder('cm')
    //         .select([...this._selector, 'board.id', 'user.id', 'parent.id'])
    //         .leftJoin('cm.board', 'board')
    //         .leftJoin('cm.user', 'user')
    //         .where('cm.deleteAt is NULL')
    //         .andWhere('board.id=:boardID', { boarID: boardID })
    //         .getMany();
    // }

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
