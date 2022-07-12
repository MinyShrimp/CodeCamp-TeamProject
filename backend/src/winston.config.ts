import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger, format, transports } from 'winston';

const { combine, timestamp, colorize, errors, json, printf } = format;

export let FileLogger: Logger;
export let ConsoleLogger: Logger;
const isProd = process.env.MODE === 'PRODUCTION';

export const createLogger = () => {
    if (FileLogger) {
        FileLogger.error('Logger instance already defined. So ignore it.');
        return;
    }

    FileLogger = winston.createLogger({
        level: isProd ? 'warn' : 'info',
        format: combine(
            errors({ stack: true }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            json(),
        ),
        transports: [],
    });

    ConsoleLogger = winston.createLogger({
        level: isProd ? 'warn' : 'info',
        format: combine(
            colorize(),
            errors({ stack: true }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.ms',
            }),
            printf((info) => {
                return `[${info.timestamp}] [${info.from}] ${info.level}: ${
                    info.stack
                        ? JSON.stringify(info.stack, null, 2)
                        : info.message
                }`;
            }),
        ),
        transports: [new winston.transports.Console()],
    });

    FileLogger.add(
        new transports.DailyRotateFile({
            level: 'error',
            filename: 'log/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );

    FileLogger.add(
        new transports.DailyRotateFile({
            filename: 'log/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );
};
