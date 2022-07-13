import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { getNowDate } from 'src/commons/utils/date.util';
import { PaymentEntity } from 'src/apis/payment/entities/payment.entity';
import { UserLikeEntity } from 'src/apis/userLike/entities/userLike.entity';

import { UserEntity } from './user.entity';
import { UpdateUserInput } from '../dto/updateUser.input';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 검사 //

    async getOnlyID(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id'])
            .where('user.id=:id', { id: userID })
            .getOne();
    }

    async getOnlyIDByEmail(
        email: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id'])
            .where('user.email=:email', { email: email })
            .getOne();
    }

    async getOnlyIDByNickName(
        nickName: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id'])
            .where('user.nickName=:nickName', { nickName: nickName })
            .getOne();
    }

    async getOnlyIDByEmailOrNickName(
        email: string, //
        nickName: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id'])
            .where('user.nickName=:nickName', { nickName: nickName })
            .orWhere('user.email=:email', { email: email })
            .getOne();
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * ID 기반 회원 조회
     * @param userID
     * @returns 회원 정보
     */
    async findOneByID(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'user.name',
                'user.nickName',
                'user.email',
                'user.phone',
                'user.point',
                'uc.id',
                'ap.isAuth',
                'ap.updateAt',
                'ae.isAuth',
                'ae.updateAt',
                'ul.createAt',
                'ult.id',
                'ult.nickName',
                'ult.email',
                'ub.createAt',
                'ubt.id',
                'ubt.nickName',
                'ubt.email',
                'board.id',
                'board.title',
                'board.likeCount',
                'board.dislikeCount',
                'board.viewCount',
                'board.createAt',
                'board.updateAt',
            ])
            .where('user.id=:id', { id: userID })
            .leftJoin('user.userClass', 'uc')
            .leftJoin('user.authPhone', 'ap')
            .leftJoin('user.authEmail', 'ae')
            .leftJoin('user.userLikes', 'ul')
            .leftJoin('user.userBlocks', 'ub')
            .leftJoin('ul.to', 'ult')
            .leftJoin('ub.to', 'ubt')
            .leftJoin('user.boards', 'board')
            .getOne();
    }

    /**
     * Email 기반 회원 조회
     * @param email
     * @returns 회원 정보
     */
    async findOneByEmail(
        email: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
            relations: ['userClass'],
        });
    }

    /**
     * 유저 기반 결제 정보 조회
     */
    async findPayments(
        userID: string, //
    ): Promise<PaymentEntity[]> {
        const findOne = await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'p.id',
                'p.impUid',
                'p.merchantUid',
                'p.amount',
                'p.createAt',
                'pp.id',
                'pp.point',
                's.id',
            ])
            .leftJoin('user.payments', 'p')
            .leftJoin('p.product', 'pp')
            .leftJoin('p.status', 's')
            .where('user.id=:id', { id: userID })
            .getOne();

        return findOne.payments;
    }

    /**
     * 유저 기반 선호 작가 조회
     */
    async findUserLikes(
        userID: string, //
    ): Promise<UserLikeEntity[]> {
        const findOne = await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'ul.id',
                'ul.createAt',
                'ult.id',
                'ult.nickName',
            ])
            .leftJoin('user.userLikes', 'ul')
            .leftJoin('ul.to', 'ult')
            .where('user.id=:id', { id: userID })
            .getOne();

        return findOne.userLikes;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    create(
        entity: Partial<UserEntity>, //
    ): UserEntity {
        return this.userRepository.create(entity);
    }

    async save(
        entity: Partial<UserEntity>, //
    ): Promise<UserEntity> {
        return await this.userRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    async updateInfo(
        userID: string,
        info: UpdateUserInput,
    ): Promise<UpdateResult> {
        return await this.userRepository.update({ id: userID }, info);
    }

    async updatePwd(
        userID: string,
        pwd: string, //
    ): Promise<UpdateResult> {
        return await this.userRepository.update(
            { id: userID },
            {
                pwd: pwd,
                logoutAt: getNowDate(),
                isLogin: false,
            },
        );
    }

    async login(
        userID: string, //
    ): Promise<UpdateResult> {
        return await this.userRepository.update(
            { id: userID },
            {
                loginAt: getNowDate(),
                isLogin: true,
            },
        );
    }

    async logout(
        userID: string, //
    ): Promise<UpdateResult> {
        return await this.userRepository.update(
            { id: userID },
            {
                logoutAt: getNowDate(),
                isLogin: false,
            },
        );
    }

    async restore(
        userID: string, //
    ): Promise<UpdateResult> {
        return await this.userRepository.restore({ id: userID });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        userID: string, //
    ): Promise<UpdateResult> {
        return await this.userRepository.update(
            { id: userID },
            {
                deleteAt: getNowDate(),
                isLogin: false,
                logoutAt: getNowDate(),
            },
        );
    }
}
