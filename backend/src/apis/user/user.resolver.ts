import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { UserOutput } from './dto/user.output';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserRepository } from './entities/user.repository';

import { UserService } from './user.service';
import { CreateUserOutput } from './dto/createUser.output';
import { PaymentEntity } from '../payment/entities/payment.entity';

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

    /**
     * GET /api/user
     * - Bearer JWT
     */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => UserOutput, //
        { description: '회원 단일 조회, Bearer JWT', nullable: true },
    )
    fetchLoginUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<UserOutput> {
        return this.userRepository.findOneByID(currentUser.id);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [PaymentEntity], //
        { description: '회원 결제 목록' },
    )
    fetchPaymentsInUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<PaymentEntity[]> {
        return this.userRepository.findPayments(currentUser.id);
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

    /**
     * PATCH /api/user/pwd
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '비밀번호 변경, Bearer JWT' },
    )
    async updateUserPwd(
        @CurrentUser() currentUser: IPayload, //
        @Args('pwd') pwd: string,
    ): Promise<ResultMessage> {
        // 비밀번호 변경 + 로그아웃
        const result = await this.userService.updatePwd(currentUser.id, pwd);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_UPDATE_PWD_SUCCESSED
                : MESSAGES.USER_UPDATE_PWD_FAILED,
        });
    }

    /**
     * PATCH /api/user
     * - Bearer JWT
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '회원 정보 수정, Bearer JWT' },
    )
    async updateLoginUser(
        @CurrentUser() currentUser: IPayload,
        @Args('updateInput') updateInput: UpdateUserInput,
    ): Promise<ResultMessage> {
        const result = await this.userService.updateLoginUser(
            currentUser.id,
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

    /**
     * DELETE /api/user
     * - Bearer JWT
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 ( Soft ), Bearer JWT' },
    )
    async deleteLoginUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        const result = await this.userService.softDelete(currentUser.id);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_SOFT_DELETE_SUCCESSED
                : MESSAGES.USER_SOFT_DELETE_FAILED,
        });
    }
}
