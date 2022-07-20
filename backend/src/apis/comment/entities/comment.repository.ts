import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 모든 댓글 조회
     */
    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.board', 'board')
            .leftJoinAndSelect('c.user', 'user')
            .leftJoinAndSelect('user.userClass', 'uc')
            .leftJoinAndSelect('c.children', 'children')
            .leftJoinAndSelect('children.user', 'cu')
            .leftJoinAndSelect('cu.userClass', 'cuc')
            .where('c.parentID is null')
            .orderBy('c.createAt')
            .addOrderBy('children.createAt')
            .getMany();
    }

    /**
     *  댓글 ID 기반 조회
     */
    async findOneByComment(
        commentID: string, //
    ): Promise<CommentEntity> {
        return await this.commentRepository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.board', 'board')
            .leftJoinAndSelect('c.user', 'user')
            .leftJoinAndSelect('user.userClass', 'uc')
            .leftJoinAndSelect('c.children', 'children')
            .leftJoinAndSelect('children.user', 'cu')
            .leftJoinAndSelect('cu.userClass', 'cuc')
            .where('c.id=:id', { id: commentID })
            .orderBy('c.createAt')
            .addOrderBy('children.createAt')
            .getOne();
    }

    /**
     *  유저 ID 기반 조회
     */
    async findByIDFromComments(
        userID: string, //
    ): Promise<CommentEntity[]> {
        return await this.commentRepository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.board', 'board')
            .leftJoinAndSelect('c.user', 'user')
            .leftJoinAndSelect('user.userClass', 'uc')
            .leftJoinAndSelect('c.children', 'children')
            .leftJoinAndSelect('children.user', 'cu')
            .leftJoinAndSelect('cu.userClass', 'cuc')
            .where('c.parentID is null')
            .andWhere('user.id=:id', { id: userID })
            .orderBy('c.createAt')
            .addOrderBy('children.createAt')
            .getMany();
    }

    /**
     * 보드ID 기반 조회
     */
    async findByBoardIDFromComment(
        boardID: string, //
    ): Promise<CommentEntity[]> {
        return await this.commentRepository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.board', 'board')
            .leftJoinAndSelect('c.user', 'user')
            .leftJoinAndSelect('user.userClass', 'uc')
            .leftJoinAndSelect('c.children', 'children')
            .leftJoinAndSelect('children.user', 'cu')
            .leftJoinAndSelect('cu.userClass', 'cuc')
            .where('c.parentID is null')
            .andWhere('board.id=:id', { id: boardID })
            .getMany();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //
    create(
        entity: Partial<CommentEntity>, //
    ): CommentEntity {
        return this.commentRepository.create(entity);
    }

    async save(
        entity: Partial<CommentEntity>, //
    ): Promise<CommentEntity> {
        return await this.commentRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        commentID: string, //
    ): Promise<UpdateResult> {
        return await this.commentRepository.softDelete({
            id: commentID,
        });
    }
}
