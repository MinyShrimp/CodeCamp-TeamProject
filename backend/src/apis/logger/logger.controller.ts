import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { LoggerService } from './logger.service';

@ApiTags('로깅')
@Controller('admin')
export class LoggerController {
    constructor(
        private readonly loggerService: LoggerService, //
    ) {}

    @Get('/response/:id')
    getAllResponseLog(
        @Param('id') page: number, //
    ) {
        return this.loggerService.getLoggerResponse(page);
    }
}
