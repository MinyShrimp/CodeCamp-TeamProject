import { Module } from '@nestjs/common';
import { LoggerAdminController } from './logger.admin.controller';
import { LoggerService } from './logger.service';

@Module({
    imports: [],
    controllers: [LoggerAdminController],
    providers: [LoggerService],
})
export class LoggerModule {}
