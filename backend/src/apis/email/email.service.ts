import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { EmailUtil } from 'src/commons/utils/email.util';
import { UserEntity } from '../user/entities/user.entity';
import { EmailDto } from './dto/email.dto';
import { EmailEntity } from './entities/email.entity';
import { EmailRepository } from './entities/email.repository';

@Injectable()
export class EmailService {
    constructor(
        private readonly emailRepository: EmailRepository, //
    ) {}

    private async isValidToken(
        token: string, //
    ): Promise<EmailEntity> {
        const _email = await this.emailRepository.findOneByToken(token);
        if (_email) {
            if (!_email.isAuth) {
                return _email;
            }
            throw new ConflictException(MESSAGES.USER_ALREADY_EMAIL);
        }
        throw new ConflictException(MESSAGES.USER_UNVALID_EMAIL);
    }

    private async isOverlapEmail(
        email: string, //
    ): Promise<EmailEntity> {
        const _email = await this.emailRepository.findOne(email);
        if (_email) {
            throw new ConflictException(MESSAGES.USER_OVERLAP_PHONE);
        }
        return _email;
    }

    async SendAuthEmail(
        emailDto: EmailDto, //
        user: UserEntity,
    ): Promise<EmailEntity> {
        // 이메일 중복 체크
        await this.isOverlapEmail(emailDto.email);

        const result = await EmailUtil.sendAuthEmail(
            emailDto.email,
            emailDto.token,
        );
        if (result) {
            return await this.emailRepository.save({
                ...emailDto,
                user: user,
            });
        } else {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
    }

    async AuthEmail(
        token: string, //
    ): Promise<string> {
        const email = await this.isValidToken(token);
        const result = await this.emailRepository.auth(email.token);
        return result ? MESSAGES.USER_SUCCESS_EMAIL : MESSAGES.UNVLIAD_ACCESS;
    }
}
