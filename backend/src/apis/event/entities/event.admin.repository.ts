import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateEventAdminInput } from '../dto/createEvent.admin.input';
import { UpdateEventAdminInput } from '../dto/updateEvent.admin.input';

import { EventEntity } from './event.entity';

@Injectable()
export class EventAdminRepository {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'event.id', 'event.title', 'event.contents', 
        'event.startAt', 'event.endAt', 'event.createAt', 'event.updateAt', 
    ];

    async findAll(): Promise<EventEntity[]> {
        return await this.eventRepository
            .createQueryBuilder('event')
            .select(this._selector)
            .withDeleted()
            .orderBy('event.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<EventEntity> {
        return await this.eventRepository
            .createQueryBuilder('event')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('event.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateEventAdminInput, //
    ): Promise<EventEntity> {
        return await this.eventRepository.save(input);
    }

    async update(
        input: UpdateEventAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.eventRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.eventRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
