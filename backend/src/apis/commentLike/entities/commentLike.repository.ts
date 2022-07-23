import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CommentLikeEntity } from './commentLike.entity';
import { CreateCommentLikeDto } from '../dto/createCommentLike.dto';
import { DeleteCommentLikeDto } from '../dto/deleteCommentLike.dto';

@Injectable()
export class CommentLikeRepository {
    constructor(
        @InjectRepository(CommentLikeEntity)
        private readonly commentLikeRepository: Repository<CommentLikeEntity>, //
    ) {}

    /** 유저ID로 조회 */
    async findList(
        userID: string, //
    ): Promise<CommentLikeEntity[]> {
        return await this.commentLikeRepository
            .createQueryBuilder('cl')
            .leftJoinAndSelect('cl.comment', 'CommentEntity')
            .leftJoinAndSelect('cl.user', 'UserEntity')
            .leftJoinAndSelect('UserEntity.userClass', 'UserClassEntity')
            .where('cl.userID=:userID', { userID })
            .orderBy('cl.createAt')
            .getMany();
    }

    async checkValid(
        dto: DeleteCommentLikeDto, //
    ): Promise<CommentLikeEntity> {
        return await this.commentLikeRepository
            .createQueryBuilder('cl')
            .select(['cl.id', 'cl.userID', 'cl.commentID'])
            .where('cl.id=:id', { id: dto.commentLikeID })
            .andWhere('cl.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    async checkOverlap(
        dto: CreateCommentLikeDto, //
    ): Promise<CommentLikeEntity> {
        return await this.commentLikeRepository
            .createQueryBuilder('cl')
            .select(['cl.id', 'cl.userID', 'cl.commentID'])
            .where('cl.userID=:userID', { userID: dto.userID })
            .andWhere('cl.commentID=:commentID', { commentID: dto.commentID })
            .getOne();
    }

    // 등록
    async save(
        commentLike: Partial<Omit<CommentLikeEntity, 'id'>>, //
    ): Promise<CommentLikeEntity> {
        return await this.commentLikeRepository.save(commentLike);
    }

    // 삭제
    async delete(
        commentLikeID: string, //
    ): Promise<DeleteResult> {
        return await this.commentLikeRepository.delete({
            id: commentLikeID,
        });
    }
}
