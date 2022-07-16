import { LoggerService } from '@nestjs/common';
import { FileLogger, ConsoleLogger } from './winston.config';

export class AppLoggerService implements LoggerService {
    private readonly ignores = [
        'NestFactory',
        'InstanceLoader',
        'RoutesResolver',
        'RouterExplorer',
        'GraphQLModule',
        'NestApplication',
    ];

    log(message: any, context?: string) {
        ConsoleLogger.info(message, { from: context });
        if (context === 'NestApplication') {
            const name = 'Application';
            ConsoleLogger.info(
                `=================================================`,
                { from: name },
            );
            ConsoleLogger.info(
                `=                 Server Open                   =`,
                { from: name },
            );
            ConsoleLogger.info(
                `=================================================`,
                { from: name },
            );
        }

        if (!this.ignores.includes(context)) {
            FileLogger.info(message, { from: context });
        }
    }

    error(message: any, trace: string, context?: string) {
        FileLogger.error(message, { stack: trace, from: context });
        ConsoleLogger.error(message, { from: context });
    }

    warn(message: any, context?: string) {
        FileLogger.warn(message, { from: context });
        ConsoleLogger.warn(message, { from: context });
    }

    debug(message: any, context?: string) {
        FileLogger.debug(message, { from: context });
        ConsoleLogger.debug(message, { from: context });
    }

    verbose(message: any, context?: string) {
        FileLogger.verbose(message, { from: context });
        ConsoleLogger.verbose(message, { from: context });
    }
}
