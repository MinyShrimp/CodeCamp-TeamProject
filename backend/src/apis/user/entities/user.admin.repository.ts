import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserAdminRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'user.id', 'user.name', 'user.nickName', 'user.pwd',
        'user.email', 'user.phone', 'user.point',
        'user.loginAt', 'user.logoutAt', 'user.isLogin',
        'user.createAt', 'user.updateAt', 'user.deleteAt',
        'e.id', 'e.isAuth', 'p.id', 'p.isAuth', 'c.id'
    ];

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(this._selector)
            .withDeleted()
            .leftJoin('user.emailAuth', 'e')
            .leftJoin('user.phoneAuth', 'p')
            .leftJoin('user.userClass', 'c')
            .orderBy('user.createAt')
            .getMany();
    }

    async findOne(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository
            .createQueryBuilder('user')
            .select(this._selector)
            .withDeleted()
            .leftJoin('user.emailAuth', 'e')
            .leftJoin('user.phoneAuth', 'p')
            .leftJoin('user.userClass', 'c')
            .where('user.id=:id', { id: userID })
            .getOne();
    }
}
