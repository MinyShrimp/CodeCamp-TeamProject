import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from '../../commons/interfaces/Payload.interface';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from '../../commons/auth/gql-auth.guard';

import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import { UserRepository } from './entities/user.repository';

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
     * @response 회원 단일 조회
     */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => UserEntity, //
        { description: '회원 단일 조회, Bearer JWT', nullable: true },
    )
    fetchLoginUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<UserEntity> {
        return this.userRepository.findOneByID(currentUser.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/signup
     * @param input
     * @response 생성된 회원 정보
     */
    @Mutation(
        () => UserEntity, //
        { description: '회원가입' },
    )
    async createUser(
        @Args('createUserInput') input: CreateUserInput, //
    ): Promise<UserEntity> {
        return this.userService.createUser(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/user/pwd
     * @param pwd
     * @response ResultMessage
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
        return this.userService.updatePwd(currentUser.id, pwd);
    }

    /**
     * PATCH /api/user
     * - Bearer JWT
     * @param currentUser
     * @response 수정된 회원 정보
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => UserEntity, //
        { description: '회원 정보 수정, Bearer JWT' },
    )
    async updateLoginUser(
        @CurrentUser() currentUser: IPayload,
        @Args('updateInput') updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        return this.userService.updateLoginUser(currentUser.id, updateInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /api/user
     * - Bearer JWT
     * @response ResultMessage
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 ( Soft ), Bearer JWT' },
    )
    deleteLoginUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        return this.userService.softDelete(currentUser.id);
    }
}
