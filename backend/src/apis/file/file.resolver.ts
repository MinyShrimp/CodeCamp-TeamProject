import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { FileEntity } from './entities/file.entity';
import { FILE_TYPE } from './interface/type.enum';
import { FileService } from './file.service';

/* FileUpload API */
@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class FileResolver {
    constructor(
        private readonly fileService: FileService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/uploadFile
     * @returns 업로드 URLs
     */
    @Mutation(
        () => [FileEntity], //
        { description: `파일 업로드` },
    )
    uploadFile(
        @Args({ name: 'FILE_TYPE', type: () => FILE_TYPE }) type: FILE_TYPE,
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<FileEntity[]> {
        return this.fileService.uploadInGoogleStorage(type, files, false);
    }

    /**
     * POST /api/uploadFile
     * @returns 업로드 URLs
     */
    @Mutation(
        () => [FileEntity], //
        { description: `파일 업로드 ( 썸네일 제작 )` },
    )
    uploadFileWithThumb(
        @Args({ name: 'FILE_TYPE', type: () => FILE_TYPE }) type: FILE_TYPE,
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<FileEntity[]> {
        return this.fileService.uploadInGoogleStorage(type, files, true);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/fileUpload/:id
     * @param fileIDs
     * @response ResultMessage
     */
    @Mutation(
        () => [Boolean], //
        { description: `파일 삭제` },
    )
    deleteFileUpload(
        @Args({ name: 'fileIDs', type: () => [String] }) fileIDs: string[], //
    ): Promise<boolean[]> {
        return this.fileService.softDeleteInGoogleStorage(fileIDs);
    }
}
