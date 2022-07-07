import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FileEntity } from './file.entity';

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
