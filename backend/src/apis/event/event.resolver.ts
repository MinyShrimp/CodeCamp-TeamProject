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
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

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
        () => ResultMessage, //
        { description: '이벤트 삭제' },
    )
    async deleteEvent(
        @CurrentUser() currentUser: IPayload, //
        @Args('eventID') eventID: string,
    ): Promise<ResultMessage> {
        const result = await this.eventService.softDelete(
            currentUser.id,
            eventID,
        );
        return new ResultMessage({
            id: eventID,
            isSuccess: result,
            contents: result
                ? MESSAGES.EVENT_SOFT_DELETE_SUCCESSED
                : MESSAGES.EVENT_SOFT_DELETE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 취소 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '이벤트 삭제 취소' },
    )
    async restoreEvent(
        @CurrentUser() currentUser: IPayload,
        @Args('eventID') eventID: string,
    ): Promise<ResultMessage> {
        const result = await this.eventService.restore(currentUser.id, eventID);
        return new ResultMessage({
            id: eventID,
            isSuccess: result,
            contents: result
                ? MESSAGES.EVENT_RESTORE_SUCCESSED
                : MESSAGES.EVENT_RESTORE_FAILED,
        });
    }
}
