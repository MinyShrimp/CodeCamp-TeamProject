import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { UserLikeEntity } from '../userLike/entities/userLike.entity';
import { UserBlockEntity } from '../userBlock/entities/userBlock.entity';
import { NovelLikeEntity } from '../novelLike/entities/novelLike.entity';
import { NovelDonateEntity } from '../novelDonate/entities/novelDonate.entity';

import { UserOutput } from './dto/user.output';
import { UserRepository } from './entities/user.repository';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { CreateUserOutput } from './dto/createUser.output';

import { UserService } from './user.service';
import { FetchPaymentOutput } from '../payment/dto/fetchPayments.output';
import { PaymentPointEntity } from '../paymentPoint/entities/paymentPoint.entity';

/* 유저 API */
@Resolver()
export class UserResolver {
    constructor(
        private readonly userRepository: UserRepository, //
        private readonly userService: UserService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Util //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // 회원 단일 조회
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => UserOutput, //
        { description: '회원 단일 조회, Bearer JWT', nullable: true },
    )
    fetchLoginUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<UserOutput> {
        return this.userRepository.findOneByID(payload.id);
    }

    // 결제 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => FetchPaymentOutput, //
        { description: '회원 결제 목록, Pagenation' },
    )
    fetchPaymentsInUser(
        @CurrentUser() payload: IPayload, //
        @Args({ name: 'page', type: () => Int }) page: number,
    ): Promise<FetchPaymentOutput> {
        return this.userRepository.findPaymentsPage(payload.id, page);
    }

    // 선호 작가 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [UserLikeEntity], //
        { description: '선호 작가 목록' },
    )
    fetchUserLikeInUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<UserLikeEntity[]> {
        return this.userRepository.findUserLikes(payload.id);
    }

    // 차단 회원 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [UserBlockEntity], //
        { description: '차단 회원 목록' },
    )
    fetchUserBlockInUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<UserBlockEntity[]> {
        return this.userRepository.findUserBlocks(payload.id);
    }

    // 선호작 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [NovelLikeEntity], //
        { description: '선호작 목록' },
    )
    fetchNovelLikeInUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<NovelLikeEntity[]> {
        return this.userRepository.findNovelLikes(payload.id);
    }

    // 후원작 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [NovelDonateEntity], //
        { description: '후원작 목록' },
    )
    fetchNovelDonateInUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<NovelDonateEntity[]> {
        return this.userRepository.findNovelDonates(payload.id);
    }

    // 에피소드 ( 회차 ) 결제 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [PaymentPointEntity], //
        { description: '에피소드 ( 회차 ) 결제 목록' },
    )
    fetchPaidPoints(
        @CurrentUser() payload: IPayload, //
        @Args({ name: 'page', type: () => Int }) page: number,
    ): Promise<PaymentPointEntity[]> {
        return this.userRepository.findPointPaymentsInIndex(payload.id, page);
    }

    // 후원 결제 목록
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [PaymentPointEntity], //
        { description: '후원 결제 목록' },
    )
    fetchDonatePoints(
        @CurrentUser() payload: IPayload, //
        @Args({ name: 'page', type: () => Int }) page: number,
    ): Promise<PaymentPointEntity[]> {
        return this.userRepository.findPointPaymentsInNovel(payload.id, page);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/signup
     */
    @Mutation(
        () => CreateUserOutput, //
        { description: '회원가입' },
    )
    createUser(
        @Args('createUserInput') input: CreateUserInput, //
    ): Promise<CreateUserOutput> {
        return this.userService.createUser(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    // 비밀번호 변경
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '비밀번호 변경, Bearer JWT' },
    )
    async updateUserPwd(
        @CurrentUser() payload: IPayload, //
        @Args('pwd') pwd: string,
    ): Promise<ResultMessage> {
        // 비밀번호 변경 + 로그아웃
        const result = await this.userService.updatePwd(payload.id, pwd);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_UPDATE_PWD_SUCCESSED
                : MESSAGES.USER_UPDATE_PWD_FAILED,
        });
    }

    // 회원 정보 수정
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '회원 정보 수정, Bearer JWT' },
    )
    async updateLoginUser(
        @CurrentUser() payload: IPayload,
        @Args('updateInput') updateInput: UpdateUserInput,
    ): Promise<ResultMessage> {
        const result = await this.userService.updateLoginUser(
            payload.id,
            updateInput,
        );
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_UPDATE_INFO_SUCCESSED
                : MESSAGES.USER_UPDATE_INFO_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // 회원 탈퇴
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 ( Soft ), Bearer JWT' },
    )
    async deleteLoginUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<ResultMessage> {
        const result = await this.userService.softDelete(payload.id);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_SOFT_DELETE_SUCCESSED
                : MESSAGES.USER_SOFT_DELETE_FAILED,
        });
    }
}
