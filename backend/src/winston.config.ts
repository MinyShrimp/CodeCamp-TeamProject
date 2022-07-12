import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint, colorize, errors, json, printf } =
    format;

export let logger: Logger;
const isProd = process.env.MODE === 'PRODUCTION';

export const createLogger = () => {
    if (logger) {
        logger.error('Logger instance already defined. So ignore it.');
        return;
    }

    logger = winston.createLogger({
        level: isProd ? 'warn' : 'info',
        format: combine(
            errors({ stack: true }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            json(),
            ...(isProd ? [] : [prettyPrint()]),
        ),
        transports: [],
    });

    if (!isProd) {
        logger.add(
            new transports.Console({
                format: combine(
                    colorize(),
                    errors({ stack: true }),
                    timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }),
                    printf((info) => {
                        return `[${info.from}] ${info.level}: ${
                            info.stack
                                ? JSON.stringify(info.stack, null, 2)
                                : info.message
                        } - ${info.timestamp}`;
                    }),
                ),
            }),
        );
    }

    // if (isProd) {
    logger.add(
        new transports.DailyRotateFile({
            level: 'error',
            filename: 'log/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );

    logger.add(
        new transports.DailyRotateFile({
            filename: 'log/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );
    // }
};
