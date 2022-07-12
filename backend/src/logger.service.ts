import { LoggerService } from '@nestjs/common';
import { logger } from './winston.config';

export class AppLoggerService implements LoggerService {
    private readonly ignores = [
        'NestFactory',
        'InstanceLoader',
        'RoutesResolver',
        'RouterExplorer',
        'GraphQLModule',
    ];

    log(message: any, context?: string) {
        // prettier-ignore
        if (this.ignores.includes(context)) { return; }
        logger.info(message, { from: context });
    }

    error(message: any, trace: string, context?: string) {
        logger.error(message, { stack: trace, from: context });
    }

    warn(message: any, context?: string) {
        logger.warn(message, { from: context });
    }

    debug(message: any, context?: string) {
        logger.debug(message, { from: context });
    }

    verbose(message: any, context?: string) {
        logger.verbose(message, { from: context });
    }
}
