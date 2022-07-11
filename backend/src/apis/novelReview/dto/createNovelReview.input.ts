import { extend, InputType, PickType } from '@nestjs/graphql';
import { NovelReviewEntity } from '../entities/novelReview.entity';

@InputType()
export class CreateNovelReviewInput extends PickType(
    NovelReviewEntity,
    ['contents', 'star'], //
    InputType,
) {}
