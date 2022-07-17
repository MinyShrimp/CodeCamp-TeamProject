import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NovelDonateEntity } from './novelDonate.entity';
import { DeleteNovelDonateDto } from '../dto/deleteNovelDonate.dto';
import { CreateNovelDonateDto } from '../dto/createNovelDonate.dto';

@Injectable()
export class NovelDonateRepository {
    constructor(
        @InjectRepository(NovelDonateEntity)
        private readonly novelDonateRepository: Repository<NovelDonateEntity>,
    ) {}

    async checkValid(
        dto: DeleteNovelDonateDto, //
    ): Promise<NovelDonateEntity> {
        return await this.novelDonateRepository
            .createQueryBuilder('nd')
            .select(['nd.id', 'nd.userID'])
            .where('nd.id=:id', { id: dto.novelDonateID })
            .andWhere('nd.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    async checkOverlap(
        dto: CreateNovelDonateDto, //
    ): Promise<NovelDonateEntity> {
        return await this.novelDonateRepository
            .createQueryBuilder('nd')
            .select(['nd.id', 'nd.userID', 'nd.novelID'])
            .where('nd.userID=:userID', { userID: dto.userID })
            .andWhere('nd.novelID=:novelID', { novelID: dto.novelID })
            .getOne();
    }

    /**
     * 유저 기반 후원작 조회
     */
    async findList(
        userID: string, //
    ): Promise<NovelDonateEntity[]> {
        return await this.novelDonateRepository
            .createQueryBuilder('nd')
            .leftJoinAndSelect('nd.novel', 'to')
            .leftJoinAndSelect('to.user', 'tu')
            .leftJoinAndSelect('tu.userClass', 'tuc')
            .leftJoinAndSelect('to.novelCategory', 'tc')
            .leftJoinAndSelect('to.novelTags', 'tt')
            .leftJoinAndSelect('to.files', 'tf')
            .where('nd.userID=:id', { id: userID })
            .orderBy('nd.createAt')
            .getMany();
    }

    async save(
        novelDonate: Partial<Omit<NovelDonateEntity, 'id'>>, //
    ): Promise<NovelDonateEntity> {
        return await this.novelDonateRepository.save(novelDonate);
    }

    async delete(
        novelDonateID: string, //
    ): Promise<DeleteResult> {
        return await this.novelDonateRepository.delete({
            id: novelDonateID,
        });
    }
}
