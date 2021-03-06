import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { BoardEntity } from './board.entity';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>, //
    ) {}

    private readonly _selector = [
        'board.id',
        'board.title',
        'board.contents',
        'board.likeCount',
        'board.dislikeCount',
        'board.viewCount',
        'board.createAt',
        'board.updateAt',
    ];

    /** 페이지네이션 */
    async getPage(
        page: number, //
    ): Promise<BoardEntity[]> {
        const take: number = 10;

        return await this.boardRepository
            .createQueryBuilder('board')
            .select([
                ...this._selector,
                'user.id',
                'user.nickName',
                'files.id',
                'files.url',
            ])
            .leftJoin('board.user', 'user')
            .leftJoin('board.files', 'files')
            .take(take)
            .skip(take * (page - 1))
            .where('board.user is not NULL')
            .orderBy('board.createAt', 'DESC')
            .getMany();
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * ID 기반 조회
     */
    async getOneWithDeleted(
        boardID: string, //
    ): Promise<BoardEntity> {
        return await this.boardRepository
            .createQueryBuilder('board')
            .withDeleted()
            .leftJoinAndSelect('board.user', 'UserEntity')
            .leftJoinAndSelect('board.files', 'files')
            .where('board.user IS NOT NULL')
            .where('board.id=:boardID', { boardID })
            .orderBy('board.createAt', 'DESC')
            .getOne();
    }

    /**
     * 전체 갯수 조회
     */
    async getCount(): Promise<number> {
        return await this.boardRepository.count();
    }

    /**
     * 전체 조회
     */
    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository.find({
            relations: ['user', 'comments', 'user.userClass', 'files'],
            order: { createAt: 'DESC' },
        });
    }

    /**
     * 유저 ID 기반 조회
     */
    async findByIDFromBoards(
        userID: string, //
    ): Promise<BoardEntity[]> {
        return await this.boardRepository.find({
            relations: ['user', 'comments'],
            where: { user: userID },
        });
    }

    /**
     * boardID 기반 조회
     */
    async findOneByBoard(
        boardID: string, //
    ): Promise<BoardEntity> {
        return await this.boardRepository
            .createQueryBuilder('b')
            .leftJoinAndSelect('b.user', 'user')
            .leftJoinAndSelect('user.userClass', 'userClass')
            .leftJoinAndSelect('b.comments', 'comment')
            .leftJoinAndSelect('comment.children', 'cc')
            .leftJoinAndSelect('comment.user', 'cu')
            .leftJoinAndSelect('cu.userClass', 'cuc')
            .leftJoinAndSelect('cc.user', 'ccu')
            .leftJoinAndSelect('ccu.userClass', 'ccuc')
            .leftJoinAndSelect('b.files', 'file')
            .where('b.id = :id', { id: boardID })
            .andWhere('comment.parentID is null')
            .orderBy('comment.createAt')
            .addOrderBy('cc.createAt')
            .getOne();
    }

    /**
     * 키워드 기반 조회
     */
    async search(
        keyword: string, //
    ): Promise<BoardEntity[]> {
        const NonSpacingKeyword = keyword.replace(/\s/g, '');
        const repoData = await this.boardRepository.find({
            relations: ['user', 'comments'],
        });

        let searchedKeyword = repoData.filter((word) =>
            word.title.includes(keyword),
        );

        let searchedKeyword2 = repoData.filter((word) =>
            word.title.includes(NonSpacingKeyword),
        );

        const mergeData = [...searchedKeyword, ...searchedKeyword2];
        const set = new Set(mergeData);
        const result = [...set];

        return result;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<BoardEntity>, //
    ): Promise<BoardEntity> {
        return await this.boardRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    async update(
        board: Partial<BoardEntity>, //
    ): Promise<BoardEntity> {
        return await this.boardRepository.save(board);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        boardID: string, //
    ): Promise<UpdateResult> {
        return await this.boardRepository.softDelete(boardID);
    }
}
