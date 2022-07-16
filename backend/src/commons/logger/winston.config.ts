import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger, format, transports } from 'winston';
import { BigQuery } from '@google-cloud/bigquery';

const { combine, timestamp, colorize, errors, json, printf } = format;

interface IStream {
    write: (message: string) => void;
}

export let FileLogger: Logger;
export let ConsoleLogger: Logger;
export let ResponseLogger: Logger;

export let ConsoleLoggerStream: IStream;
export let ResponseLoggerStream: IStream;

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

    ResponseLogger = winston.createLogger({
        format: combine(
            printf((info) => {
                return info.message;
            }),
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
            filename: 'log/error/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );

    FileLogger.add(
        new transports.DailyRotateFile({
            filename: 'log/app/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );

    ResponseLogger.add(
        new transports.DailyRotateFile({
            filename: 'log/response/response-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    );

    ConsoleLoggerStream = {
        write: (message) => {
            ConsoleLogger.info(
                message.substring(0, message.lastIndexOf('\n')),
                { from: 'Response' },
            );
        },
    };

    ResponseLoggerStream = {
        write: (message) => {
            const res = message.substring(0, message.lastIndexOf('\n'));
            ResponseLogger.info(res, { from: 'Response' });

            const _json = JSON.parse(res);
            const bigquery = new BigQuery({
                keyFilename: `./key/${process.env.FILE_BIGQUERY_KEY}`,
                projectId: process.env.FILE_PROJECT_ID,
            });

            const bqRequest = {};
            Object.keys(_json).forEach((key) => {
                /**
                 * key:
                 *  key가 '-'를 포함하고 있다면,
                 *  '-' + 뒤의 한글자 를 찾아서 '-' 를 제거하고 뒤의 한글자를 대문자로 변환한다.
                 *
                 * value:
                 *  value가 '-'라면,
                 *  null로 바꾼다.
                 */
                bqRequest[
                    key.includes('-')
                        ? key.replace(/-[a-z]/, (letter) =>
                              letter[1].toUpperCase(),
                          )
                        : key
                ] = _json[key] === '-' ? null : _json[key];
            });

            bigquery
                .dataset('teamproject')
                .table('response')
                .insert([bqRequest])
                .catch((e) => {
                    FileLogger.error(e);
                });
        },
    };
};
