import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

import { FileEntity } from './entities/file.entity';
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
     * @param files
     * @returns 업로드 URLs
     */
    @Mutation(
        () => [FileEntity], //
        { description: `${FileResolver.NAME}` },
    )
    uploadFile(
        @Args({
            name: 'files',
            type: () => [GraphQLUpload],
        })
        files: FileUpload[], //
    ): Promise<FileEntity[]> {
        return this.fileService.upload('test/origin/', files);
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
        () => [ResultMessage], //
        { description: `${FileResolver.NAME} 삭제 ( Real )` },
    )
    deleteFileUpload(
        @Args({ name: 'fileIDs', type: () => [String] }) fileIDs: string[], //
    ): Promise<ResultMessage[]> {
        return this.fileService.softDelete(fileIDs);
    }
}
