import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { FileEntity } from './file.entity';
import { UploadResult } from '../dto/uploadResult.dto';

@Injectable()
export class FileRepository {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {}
    private readonly _selector = [
        'file.id',
        'file.name',
        'file.path',
        'file.url',
        'file.createAt',
    ];

    async findAll(): Promise<FileEntity[]> {
        return await this.fileRepository
            .createQueryBuilder('file')
            .select(this._selector)
            .orderBy('file.createAt')
            .getMany();
    }

    async findOne(
        fileID: string, //
    ): Promise<FileEntity> {
        return await this.fileRepository
            .createQueryBuilder('file')
            .select([...this._selector, 'file.deleteAt'])
            .where('file.id=:id', { id: fileID })
            .getOne();
    }

    async findBulk(
        fileIDs: Array<string>, //
    ): Promise<FileEntity[]> {
        return await Promise.all(
            fileIDs.map((id) => {
                return this.findOne(id);
            }),
        );
    }

    async findOneByUrl(
        url: string, //
    ): Promise<FileEntity> {
        return await this.fileRepository
            .createQueryBuilder('file')
            .select([...this._selector, 'file.deleteAt'])
            .where('file.url=:url', { url: url })
            .getOne();
    }

    async findBulkByUrl(
        urls: Array<string>, //
    ): Promise<FileEntity[]> {
        return await Promise.all(
            urls.map((url) => {
                return this.findOneByUrl(url);
            }),
        );
    }

    create(
        option?: Partial<FileEntity>, //
    ): FileEntity {
        return this.fileRepository.create(option);
    }

    async save(
        option?: Partial<FileEntity>, //
    ): Promise<FileEntity> {
        return await this.fileRepository.save(option);
    }

    async saveBulk(
        files: UploadResult[], //
    ): Promise<FileEntity[]> {
        return await Promise.all(
            files.map((file) => {
                return this.fileRepository.save(file);
            }),
        );
    }

    async softDelete(
        IDs: Array<string>, //
    ): Promise<UpdateResult[]> {
        return await Promise.all(
            IDs.map((id) => {
                return this.fileRepository.softDelete({ id: id });
            }),
        );
    }
}
