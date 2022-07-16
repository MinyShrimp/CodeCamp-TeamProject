export interface ResponseLoggerType {
    date?: {
        value: Date;
    };

    remoteAddr?: string;

    remoteUser?: string;

    method?: string;

    url?: string;

    operationName?: string;

    httpVersion?: number;

    status?: number;

    res?: number;

    responseTime?: number;

    referrer?: string;

    userAgent?: string;
}
