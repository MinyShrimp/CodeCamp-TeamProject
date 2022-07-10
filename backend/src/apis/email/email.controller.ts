import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('인증')
@Controller('auth')
export class EmailController {
    constructor(
        private readonly emailService: EmailService, //
    ) {}

    @Get('/email')
    async AuthEmail(
        @Query('token') token: string, //
    ): Promise<string> {
        try {
            return await this.emailService.AuthEmail(token);
        } catch (e) {
            return e.message;
        }
    }
}
