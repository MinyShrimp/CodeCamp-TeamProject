import { Injectable } from '@nestjs/common';
import { FileAdminRepository } from './entities/file.admin.repository';
import { GoogleStorageSerivce } from './gStorage.service';

@Injectable()
export class FileAdminService {
    constructor(
        private readonly gStorageService: GoogleStorageSerivce,
        private readonly fileAdminRepository: FileAdminRepository, //
    ) {}

    async bulkDelete(
        IDs: Array<string>, //
    ) {
        const gcp_result = await this.gStorageService.delete(IDs);
        const delete_result = await this.fileAdminRepository.bulkDelete(
            gcp_result,
        );

        return gcp_result.map((id, idx) => {
            return {
                id: id,
                db: delete_result[idx].affected ? true : false,
            };
        });
    }
}
