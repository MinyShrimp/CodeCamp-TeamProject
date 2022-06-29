import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { PhoneUtil } from 'src/commons/utils/phone.util';
import { UserEntity } from '../user/entities/user.entity';

import { PhoneInput } from './dto/phone.input';
import { PhoneEntity } from './entities/phone.entity';
import { PhoneRepository } from './entities/phone.repository';

import { PhoneRedis } from './phone.redis';

@Injectable()
export class PhoneService {
    constructor(
        private readonly phoneRedis: PhoneRedis,
        private readonly phoneRepository: PhoneRepository, //
    ) {}

    private async isAlreadyAuthPhone(
        phoneNumber: string, //
    ) {
        const redis = await this.phoneRedis.getCache(phoneNumber);
        if (redis) {
            return true;
        } else {
            const phone = await this.phoneRepository.findOneByPhone(
                phoneNumber,
            );

            if (phone) {
                throw new ConflictException(MESSAGES.USER_OVERLAP_PHONE);
            }

            await this.phoneRedis.setCache(phoneNumber);
            return true;
        }
    }

    /**
     * 핸드폰 인증 번호 보내기
     * @param phoneNumber
     * @returns
     */
    async SendPhone(
        phoneNumber: string, //
    ): Promise<string> {
        await this.isAlreadyAuthPhone(phoneNumber);

        const result = await PhoneUtil.sendSMS(phoneNumber);
        if (result.isOK) {
            await this.phoneRedis.setTokenByRedis({
                phone: phoneNumber,
                token: result.token,
            });
            return process.env.MODE === 'LOCAL' ? result.token : '';
        } else {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
    }

    /**
     * 핸드폰 인증 확인
     * @param phoneInput
     * @returns
     */
    async AuthPhoneOK(
        phoneInput: PhoneInput, //
    ): Promise<string> {
        await this.isAlreadyAuthPhone(phoneInput.phone);

        const redisToken = await this.phoneRedis.getTokenByRedis(
            phoneInput.phone,
        );
        if (redisToken) {
            if (redisToken === phoneInput.token) {
                await this.phoneRedis.setTokenByRedisOK({
                    phone: phoneInput.phone,
                    token: redisToken,
                });
                return 'auth ok';
            }
        }
        throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
    }

    async create(
        phoneNumber: string, //
        user: UserEntity,
    ): Promise<PhoneEntity> {
        await this.isAlreadyAuthPhone(phoneNumber);
        const redisToken = await this.phoneRedis.getTokenByRedisOK(phoneNumber);
        if (redisToken) {
            await this.phoneRedis.deleteTokenByRedisOK(phoneNumber);
            return await this.phoneRepository.save({
                phone: phoneNumber,
                token: redisToken,
                isAuth: true,
                user: user,
            });
        }
        throw new ConflictException(MESSAGES.USER_UNVALID_PHONE);
    }

    async createOAuth(): Promise<PhoneEntity> {
        return await this.phoneRepository.save({
            phone: null,
            token: null,
            isAuth: false,
        });
    }
}
