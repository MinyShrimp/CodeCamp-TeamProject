import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserService } from '../user/user.service';
import { CreateUserBlockDto } from './dto/createUserBlock.dto';
import { DeleteUserBlockDto } from './dto/deleteUserBlock.dto';
import { UserBlockEntity } from './entities/userBlock.entity';
import { UserBlockRepository } from './entities/userBlock.reporsitory';

@Injectable()
export class UserBlockService {
    constructor(
        private readonly userService: UserService,
        private readonly userBlockRepository: UserBlockRepository, //
    ) {}

    async checkValid(
        dto: DeleteUserBlockDto, //
    ): Promise<boolean> {
        const check = await this.userBlockRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return true;
    }

    async checkOverlap(
        dto: CreateUserBlockDto, //
    ): Promise<boolean> {
        const check = await this.userBlockRepository.checkOverlap(dto);
        if (check) {
            throw new ConflictException('이미 등록된 회원입니다.');
        }
        return true;
    }

    async create(
        dto: CreateUserBlockDto, //
    ): Promise<UserBlockEntity> {
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.toID);
        const from = await this.userService.checkValid(dto.fromID);

        return await this.userBlockRepository.save({
            to: to,
            from: from,
        });
    }

    async delete(
        dto: DeleteUserBlockDto, //
    ): Promise<boolean> {
        await this.checkValid(dto);

        const result = await this.userBlockRepository.delete(dto.userBlockID);
        return result.affected ? true : false;
    }
}
