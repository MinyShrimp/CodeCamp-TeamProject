import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health Check')
export class AppController {
    @Get('/')
    @ApiOperation({
        summary: '헬스 체크 API',
        description: 'GCP Health Checking',
    })
    @ApiOkResponse({ description: 'healthChecking' })
    healthChecker() {
        return 'healthChecking';
    }
}
