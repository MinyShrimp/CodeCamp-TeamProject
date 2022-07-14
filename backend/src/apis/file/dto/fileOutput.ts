import { ObjectType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { FileEntity } from '../entities/file.entity';

@ObjectType({
    description: 'Output Object Type',
})
export class FileOutput extends PickType(FileEntity, ['id', 'url']) {}
