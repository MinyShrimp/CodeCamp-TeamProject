import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';
import { IUser } from '../../commons/interfaces/User.interface';

import { PhoneService } from '../phone/phone.service';
import { EmailService } from '../email/email.service';

import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UserCheckService } from './userCheck.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository, //
        private readonly userCheckService: UserCheckService,
        private readonly phoneService: PhoneService,
        private readonly emailService: EmailService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * Hash 비밀번호 생성
     * @param originPwd
     * @returns Hasing Password
     */
    createPassword(
        originPwd: string, //
    ): string {
        return bcrypt.hashSync(originPwd, bcrypt.genSaltSync());
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 회원가입
     * @param input
     * @returns 생성된 유저 정보
     *
     * 이메일 중복 검사
     */
    async createUser(
        input: CreateUserInput, //
    ): Promise<UserEntity> {
        // 검색
        const user = await this.userRepository.findOneByEmail(input.email);

        // 이메일 중복 체크
        this.userCheckService.checkOverlapEmail(user);

        const newUser = this.userRepository.create({
            ...input,
            pwd: this.createPassword(input.pwd),
        });

        // 핸드폰 인증 체크
        const phoneAuth = await this.phoneService.create(input.phone, newUser);

        // 이메일 인증 보내기
        const token = this.createPassword(input.email);
        const emailAuth = await this.emailService.SendAuthEmail(
            {
                email: input.email,
                token: token,
            },
            newUser,
        );

        newUser.phoneAuth = phoneAuth;
        newUser.emailAuth = emailAuth;

        // 비밀번호 해싱 후 생성
        return await this.userRepository.save(newUser);
    }

    async createUserOAuth(
        userInfo: IUser, //
    ): Promise<UserEntity> {
        // 검색
        const user = await this.userRepository.findOneByEmail(userInfo.email);

        // 이메일 중복 체크
        this.userCheckService.checkOverlapEmail(user);

        const newUser = this.userRepository.create({
            ...userInfo,
            phone: null,
            pwd: this.createPassword(randomUUID()),
        });

        // 핸드폰 인증 체크
        const phoneAuth = await this.phoneService.createOAuth();

        // 이메일 인증 보내기
        const token = this.createPassword(userInfo.email);
        const emailAuth = await this.emailService.SendAuthEmail(
            {
                email: userInfo.email,
                token: token,
            },
            newUser,
        );

        newUser.phoneAuth = phoneAuth;
        newUser.emailAuth = emailAuth;

        // 회원가입
        const result = await this.userRepository.save(newUser);

        return result;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 비밀번호 변경
     * @param userID
     * @param pwd
     * @returns ResultMessage
     */
    async updatePwd(
        userID: string, //
        pwd: string,
    ): Promise<ResultMessage> {
        // 검색
        await this.userRepository.findOneByID(userID);

        // 비밀번호 변경
        // + 로그아웃
        const result = await this.userRepository.updatePwd(
            userID,
            this.createPassword(pwd),
        );
        const isSuccess = result.affected ? true : false;

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.USER_UPDATE_PWD_SUCCESSED
                : MESSAGES.USER_UPDATE_PWD_FAILED,
        });
    }

    /**
     * 회원 정보 수정
     * @param userID
     * @param updateInput
     * @returns 수정된 회원 정보
     */
    async updateLoginUser(
        userID: string,
        updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        // 검색
        const user = await this.userRepository.findOneByID(userID);

        // 존재 여부 확인
        this.userCheckService.checkValidUser(user);

        // 수정
        return await this.userRepository.save({
            ...user,
            ...updateInput,
        });
    }

    /**
     * 회원 탈퇴 취소
     * @param userID
     * @returns ResultMessage
     */
    async restore(
        userID: string, //
    ): Promise<ResultMessage> {
        const result = await this.userRepository.restore(userID);
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.USER_RESTORE_SUCCESSED
                : MESSAGES.USER_RESTORE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 회원 삭제 ( Soft )
     * @param userID
     * @returns ResultMessage
     */
    async softDelete(
        userID: string, //
    ): Promise<ResultMessage> {
        const result = await this.userRepository.softDelete(userID);

        return new ResultMessage({
            id: userID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? MESSAGES.USER_SOFT_DELETE_SUCCESSED
                : MESSAGES.USER_SOFT_DELETE_FAILED,
        });
    }
}
