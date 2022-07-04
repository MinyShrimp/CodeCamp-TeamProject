import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyNovel } from '../novel/interface';

const now = getDefaultDate();

// prettier-ignore
export const SimpleDummyNovelTag = {
    id: '', name: '', 
}

// prettier-ignore
export const DummyNovelTagColumn = {
    ...SimpleDummyNovelTag, createAt: now,
    novel: [SimpleDummyNovel]
};
export type INovelTagColumn = typeof DummyNovelTagColumn;
