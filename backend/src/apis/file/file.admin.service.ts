import { Injectable } from '@nestjs/common';
import { FileAdminRepository } from './entities/file.admin.repository';
import { GoogleStorageSerivce } from './gStorage.service';
import { MediaServerService } from './media.service';

@Injectable()
export class FileAdminService {
    constructor(
        private readonly mediaService: MediaServerService,
        private readonly gStorageService: GoogleStorageSerivce,
        private readonly fileAdminRepository: FileAdminRepository, //
    ) {}

    /**
     * 구글 스토리지 벌크 Delete
     */
    async bulkDeleteInGoogleStorage(
        IDs: Array<string>, //
    ): Promise<Array<{ id: string; db: boolean }>> {
        const finds = (await this.fileAdminRepository.findBulk(IDs)).filter(
            (v) => v,
        );

        const noneSoftDeletes = finds
            .filter((v) => v.deleteAt === null)
            .map((v) => v.id);
        const gcp_result = await this.gStorageService.delete(noneSoftDeletes);
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

    /**
     * 미디어 서버 벌크 Delete
     */
    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<Array<boolean>> {
        const finds = (await this.fileAdminRepository.findBulk(IDs)).filter(
            (v) => v,
        );

        const noneSoftDeletes = finds
            .filter((v) => v.deleteAt === null)
            .map((v) => v.url);
        await this.mediaService.delete(noneSoftDeletes);

        const delete_result = await this.fileAdminRepository.bulkDelete(
            finds.map((v) => v.id),
        );
        return delete_result.map((r) => (r.affected ? true : false));
    }
}
