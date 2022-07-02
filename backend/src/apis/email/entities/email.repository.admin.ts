import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EmailEntity } from './email.entity';

@Injectable()
export class EmailAdminRepository {
    constructor(
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>, //
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'email.id', 'email.email', 'email.token', 
        'email.isAuth', 'email.createAt', 'email.updateAt',
        'user.id', 'user.email',
    ];

    async findAll(): Promise<EmailEntity[]> {
        return await this.emailRepository
            .createQueryBuilder('email')
            .select(this._selector)
            .withDeleted()
            .leftJoin('email.user', 'user')
            .orderBy('email.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<EmailEntity> {
        return await this.emailRepository
            .createQueryBuilder('email')
            .select(this._selector)
            .withDeleted()
            .leftJoin('email.user', 'user')
            .where('email.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.emailRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
