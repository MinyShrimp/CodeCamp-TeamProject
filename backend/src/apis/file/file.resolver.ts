import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { FileEntity } from './entities/file.entity';
import { FILE_TYPE } from './entities/type.enum';
import { FileService } from './file.service';

/* FileUpload API */
@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class FileResolver {
    private static readonly NAME = 'File';

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
        { description: `${FileResolver.NAME}` },
    )
    async uploadFile(
        @Args({ name: 'FILE_TYPE', type: () => FILE_TYPE }) type: FILE_TYPE,
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<FileEntity[]> {
        return this.fileService.upload(type, files);
    }

    /**
     * POST /api/uploadFile
     * @returns 업로드 URLs
     */
    @Mutation(
        () => [FileEntity], //
        { description: `${FileResolver.NAME}` },
    )
    async uploadFileWithThumb(
        @Args({ name: 'FILE_TYPE', type: () => FILE_TYPE }) type: FILE_TYPE,
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<FileEntity[]> {
        return this.fileService.uploadWithThumb(type, files);
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
        { description: `${FileResolver.NAME} 삭제 ( Real )` },
    )
    deleteFileUpload(
        @Args({ name: 'fileIDs', type: () => [String] }) fileIDs: string[], //
    ): Promise<boolean[]> {
        return this.fileService.softDelete(fileIDs);
    }
}
