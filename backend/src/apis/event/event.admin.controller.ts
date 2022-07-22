// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEventAdminInput } from './dto/createEvent.admin.input';
import { UpdateEventAdminInput } from './dto/updateEvent.admin.input';

import { EventEntity } from './entities/event.entity';
import { EventAdminRepository } from './entities/event.admin.repository';

@ApiTags('관리자/이벤트')
@Controller('api/admin/event')
export class EventAdminController {
    constructor(
        private readonly eventAdminRepository: EventAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<EventEntity[]> {
        return this.eventAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<EventEntity> {
        return this.eventAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateEventAdminInput, //
    ): Promise<EventEntity> {
        return this.eventAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateEventAdminInput, //
    ): Promise<boolean> {
        const result = await this.eventAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.eventAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
