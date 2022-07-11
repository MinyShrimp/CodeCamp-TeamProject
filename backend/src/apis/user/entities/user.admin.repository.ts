import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserClassRepository } from 'src/apis/userClass/entities/userClass.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserAdminInput } from '../dto/updateUser.admin.input';
import { UserEntity } from './user.entity';

@Injectable()
export class UserAdminRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private readonly userClassRepository: UserClassRepository,
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
            .leftJoin('user.authEmail', 'e')
            .leftJoin('user.authPhone', 'p')
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
            .leftJoin('user.authEmail', 'e')
            .leftJoin('user.authPhone', 'p')
            .leftJoin('user.userClass', 'c')
            .where('user.id=:id', { id: userID })
            .getOne();
    }

    async update(
        input: UpdateUserAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, userClassID, ...rest } = input;
        const userClass = await this.userClassRepository.getClass(userClassID);

        return await this.userRepository.update(
            { id: originID },
            {
                ...rest,
                userClass,
            },
        );
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.userRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
