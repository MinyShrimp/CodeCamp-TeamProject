import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable } from '@nestjs/common';

import { IUser } from '../../commons/interfaces/User.interface';
import { MESSAGES } from '../../commons/message/Message.enum';

import { PhoneService } from '../phone/phone.service';
import { EmailService } from '../email/email.service';
import { UserClassRepository } from '../userClass/entities/userClass.repository';

import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository, //
        private readonly userClassRepository: UserClassRepository,
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
    // 검사 //

    async checkValid(
        userID: string, //
    ): Promise<UserEntity> {
        const user = await this.userRepository.getOnlyID(userID);
        if (user === undefined) {
            throw new ConflictException(
                MESSAGES.USER_FIND_ONE_FAILED, //
            );
        }
        return user;
    }

    async checkOverlapEmail(
        email: string, //
    ): Promise<UserEntity> {
        const user = await this.userRepository.getOnlyIDByEmail(email);
        if (user !== undefined) {
            throw new ConflictException(
                MESSAGES.USER_OVERLAP_EMAIL, //
            );
        }
        return user;
    }

    async checkOverlapNickName(
        nickName: string, //
    ): Promise<UserEntity> {
        const user = await this.userRepository.getOnlyIDByNickName(nickName);
        if (user !== undefined) {
            throw new ConflictException(
                MESSAGES.USER_OVERLAP_EMAIL, //
            );
        }
        return user;
    }

    async checkOverlapEmailAndNickName(
        email: string, //
        nickName: string, //
    ): Promise<UserEntity> {
        const user = await this.userRepository.getOnlyIDByEmailOrNickName(
            email,
            nickName,
        );
        if (user !== undefined) {
            throw new ConflictException(
                MESSAGES.USER_OVERLAP_EMAIL, //
            );
        }
        return user;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 회원가입
     */
    async createUser(
        input: CreateUserInput, //
    ): Promise<UserEntity> {
        // 이메일, 닉네임 중복 체크
        await this.checkOverlapEmailAndNickName(input.email, input.nickName);

        const newUser = this.userRepository.create({
            ...input,
            pwd: this.createPassword(input.pwd),
        });

        // 핸드폰 인증 체크
        const authPhone = await this.phoneService.create(input.phone, newUser);

        // 이메일 인증 보내기
        const token = this.createPassword(input.email);
        const authEmail = await this.emailService.SendAuthEmail(
            {
                email: input.email,
                token: token,
            },
            newUser,
        );

        newUser.authPhone = authPhone;
        newUser.authEmail = authEmail;
        newUser.userClass = await this.userClassRepository.getClass();

        // 비밀번호 해싱 후 생성
        return await this.userRepository.save(newUser);
    }

    /**
     * 소셜 로그인 회원가입
     */
    async createUserOAuth(
        userInfo: IUser, //
    ): Promise<UserEntity> {
        // 이메일 중복 체크
        await this.checkOverlapEmail(userInfo.email);

        const newUser = this.userRepository.create({
            ...userInfo,
            nickName: v4(),
            phone: null,
            pwd: this.createPassword(v4()),
        });

        // 핸드폰 인증 체크
        const authPhone = await this.phoneService.createOAuth();

        // 이메일 인증 보내기
        const token = this.createPassword(userInfo.email);
        const authEmail = await this.emailService.SendAuthEmail(
            {
                email: userInfo.email,
                token: token,
            },
            newUser,
        );

        newUser.authPhone = authPhone;
        newUser.authEmail = authEmail;
        newUser.userClass = await this.userClassRepository.getClass();

        // 회원가입
        const result = await this.userRepository.save(newUser);

        return result;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 비밀번호 변경
     */
    async updatePwd(
        userID: string, //
        pwd: string,
    ): Promise<boolean> {
        // 존재 여부 확인
        await this.checkValid(userID);

        // 비밀번호 변경
        // + 로그아웃
        const result = await this.userRepository.updatePwd(
            userID,
            this.createPassword(pwd),
        );

        // 메세지 반환
        return result.affected ? true : false;
    }

    /**
     * 회원 정보 수정
     */
    async updateLoginUser(
        userID: string,
        updateInput: UpdateUserInput,
    ): Promise<boolean> {
        // 존재 여부 확인
        await this.checkValid(userID);

        // 수정
        const result = await this.userRepository.updateInfo(
            userID,
            updateInput,
        );
        return result.affected ? true : false;
    }

    /**
     * 회원 탈퇴 취소
     */
    async restore(
        userID: string, //
    ): Promise<boolean> {
        const result = await this.userRepository.restore(userID);
        return result.affected ? true : false;
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
    ): Promise<boolean> {
        const result = await this.userRepository.softDelete(userID);
        return result.affected ? true : false;
    }
}
