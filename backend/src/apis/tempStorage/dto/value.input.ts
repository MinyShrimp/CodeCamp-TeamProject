import { InputType, PickType } from '@nestjs/graphql';
import { TempStorageOutput } from './value.output';

@InputType()
export class TempStorageInput extends PickType(
    TempStorageOutput,
    ['title', 'contents', 'tags'],
    InputType,
) {}
