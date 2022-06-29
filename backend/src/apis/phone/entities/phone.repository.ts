import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from './phone.entity';

@Injectable()
export class PhoneRepository {
    constructor(
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>, //
    ) {}

    async findOneByPhone(
        phoneNumber: string, //
    ): Promise<PhoneEntity> {
        return await this.phoneRepository
            .createQueryBuilder('phone')
            .select(['phone.phone', 'phone.token'])
            .where('phone.phone=:number', { number: phoneNumber })
            .getOne();
    }

    async save(
        phone: Partial<PhoneEntity>, //
    ): Promise<PhoneEntity> {
        return await this.phoneRepository.save(phone);
    }
}
