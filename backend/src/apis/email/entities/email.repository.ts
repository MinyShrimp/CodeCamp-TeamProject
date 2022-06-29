import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EmailDto } from '../dto/email.dto';
import { EmailEntity } from './email.entity';

@Injectable()
export class EmailRepository {
    constructor(
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>, //
    ) {}

    async findOne(
        email: string, //
    ): Promise<EmailEntity> {
        return await this.emailRepository.findOne({
            where: { email: email },
        });
    }

    async findOneByToken(
        token: string, //
    ): Promise<EmailEntity> {
        return await this.emailRepository
            .createQueryBuilder('e')
            .select(['e.email', 'e.token', 'e.isAuth'])
            .where('e.token=:token', { token: token })
            .getOne();
    }

    async save(
        email: Partial<EmailEntity>, //
    ): Promise<EmailEntity> {
        return await this.emailRepository.save(email);
    }

    async auth(
        token: string, //
    ): Promise<UpdateResult> {
        return await this.emailRepository.update(
            { token: token },
            { isAuth: true },
        );
    }
}
