import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PhoneEntity } from './phone.entity';

@Injectable()
export class PhoneAdminRepository {
    constructor(
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>, //
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'phone.id', 'phone.phone', 'phone.token', 
        'phone.isAuth', 'phone.createAt', 'phone.updateAt',
        'user.id', 'user.email',
    ];

    async findAll(): Promise<PhoneEntity[]> {
        return await this.phoneRepository
            .createQueryBuilder('phone')
            .select(this._selector)
            .withDeleted()
            .leftJoin('phone.user', 'user')
            .orderBy('phone.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<PhoneEntity> {
        return await this.phoneRepository
            .createQueryBuilder('phone')
            .select(this._selector)
            .withDeleted()
            .leftJoin('phone.user', 'user')
            .where('phone.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.phoneRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
