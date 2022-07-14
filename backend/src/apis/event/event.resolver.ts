import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/createEvent.input';
import { UpdateEventInput } from './dto/updateEvent.input';

@Resolver()
export class EventResolver {
    constructor(
        private readonly eventService: EventService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    @Query(
        () => [EventEntity], //
        { description: '모든 이벤트 조회' },
    )
    async fetchEventsAll(): Promise<EventEntity[]> {
        return await this.eventService.findAll();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => EventEntity, //
        { description: '이벤트 작성' },
    )
    async createEvent(
        @CurrentUser() currentUser: IPayload, //
        @Args('createEventInput') input: CreateEventInput,
    ): Promise<EventEntity> {
        return await this.eventService.createEvent(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => EventEntity, //
        { description: '이벤트 수정' },
    )
    async updateEvent(
        @CurrentUser() currentUser: IPayload, //
        @Args('updateEventInput') input: UpdateEventInput,
    ): Promise<EventEntity> {
        return await this.eventService.updateEvent(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '이벤트 삭제' },
    )
    async deleteEvent(
        @CurrentUser() currentUser: IPayload, //
        @Args('eventID') eventID: string,
    ) {
        return await this.eventService.softDelete(currentUser.id, eventID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '이벤트 삭제 취소' },
    )
    async restoreEvent(
        @CurrentUser() currentUser: IPayload,
        @Args('eventID') eventID: string,
    ): Promise<string> {
        const result = await this.eventService.restore(currentUser.id, eventID);
        return result
            ? MESSAGES.NOTICE_RESTORE_SUCCESSED
            : MESSAGES.NOTICE_RESTORE_FAILED;
    }
}
