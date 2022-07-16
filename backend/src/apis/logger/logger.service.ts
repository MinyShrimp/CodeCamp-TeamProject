import { BigQuery } from '@google-cloud/bigquery';
import { Injectable } from '@nestjs/common';
import { ResponseLoggerOutput } from './dto/response.output';

@Injectable()
export class LoggerService {
    constructor() {}

    private readonly take = 100;
    private readonly table = `\`${process.env.FILE_PROJECT_ID}.teamproject.response\``;
    private readonly bigQuery = new BigQuery({
        keyFilename: `./key/${process.env.FILE_BIGQUERY_KEY}`,
        projectId: process.env.FILE_PROJECT_ID,
    });

    async getCount() {
        return (
            await this.bigQuery
                .dataset('teamproject')
                .table('response')
                .query(
                    `SELECT COUNT(date)
                        FROM ${this.table}`,
                )
        )[0][0]['f0_'];
    }

    /**
     * GCP BigQuery
     * Get Response Table
     */
    async getLoggerResponse(
        page: number, //
    ): Promise<ResponseLoggerOutput> {
        return {
            logs: (
                await this.bigQuery
                    .dataset('teamproject')
                    .table('response')
                    .query(
                        `SELECT *
                        FROM ${this.table}
                        ORDER BY date desc 
                        LIMIT ${this.take}
                        OFFSET ${page * (this.take - 1)};
                    `,
                    )
            )[0],
            count: await this.getCount(),
        };
    }
}
