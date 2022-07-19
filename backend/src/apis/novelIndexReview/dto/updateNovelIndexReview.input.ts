import { InputType, PickType } from '@nestjs/graphql';
import { NovelIndexReviewEntity } from '../entities/novelIndexReview.entity';

@InputType()
export class UpdateNovelIndexReviewInput extends PickType(
    NovelIndexReviewEntity,
    ['id', 'contents', 'star'],
    InputType,
) {}
