import { Body, Controller, Post } from '@nestjs/common';

import { IWebhook } from './interface/payment';
import { IMPService } from './imp.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('결제')
@Controller('api/payment')
export class PaymentController {
    constructor(
        private readonly impService: IMPService, //
    ) {}

    @Post('')
    async webhook(
        @Body() body: IWebhook, //
    ) {
        console.log(body);

        const token = await this.impService.getToken();
        try {
            const data = await this.impService.getPaymentData(
                body.impUid,
                token,
            );
            console.log(data);
            return data;
        } catch (e) {
            console.log(e.response.data);
        }

        return 'failed';
    }
}
