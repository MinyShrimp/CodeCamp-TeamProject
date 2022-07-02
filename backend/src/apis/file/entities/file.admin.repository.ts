import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';

@Injectable()
export class FileAdminRepository {
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

    async findAll() {
        return await this.fileRepository
            .createQueryBuilder('file')
            .select(this._selector)
            .orderBy('file.createAt')
            .getMany();
    }

    async findOne(
        fileID: string, //
    ) {
        return await this.fileRepository
            .createQueryBuilder('file')
            .select([...this._selector, 'file.deleteAt'])
            .where('file.id=:id', { id: fileID })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ) {
        return await Promise.all(
            IDs.map((id) => {
                return this.fileRepository.delete({ id: id });
            }),
        );
    }
}
