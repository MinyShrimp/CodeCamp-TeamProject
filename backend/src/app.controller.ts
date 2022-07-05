import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/')
    healthChecker() {
        return 'healthChecking';
    }
}
