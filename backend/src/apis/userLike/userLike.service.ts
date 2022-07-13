import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { UserService } from '../user/user.service';

import { CreateUserLikeDto } from './dto/createUserLike.dto';
import { DeleteUserLikeDto } from './dto/deleteUserLike.dto';

import { UserLikeEntity } from './entities/userLike.entity';
import { UserLikeRepository } from './entities/userLike.repository';

@Injectable()
export class UserLikeService {
    constructor(
        private readonly userService: UserService,
        private readonly userLikeRepository: UserLikeRepository, //
    ) {}

    async checkValid(
        dto: DeleteUserLikeDto, //
    ): Promise<boolean> {
        const check = await this.userLikeRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return true;
    }

    async checkOverlap(
        input: CreateUserLikeDto, //
    ): Promise<boolean> {
        const check = await this.userLikeRepository.checkOverlap(input);
        if (check) {
            throw new ConflictException('이미 등록된 회원입니다.');
        }
        return true;
    }

    async create(
        dto: CreateUserLikeDto, //
    ): Promise<UserLikeEntity> {
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.toID);
        const from = await this.userService.checkValid(dto.fromID);

        return await this.userLikeRepository.save({
            to: to,
            from: from,
        });
    }

    async delete(
        dto: DeleteUserLikeDto, //
    ): Promise<boolean> {
        await this.checkValid(dto);

        const result = await this.userLikeRepository.delete(dto.userLikeID);
        return result.affected ? true : false;
    }
}
