import { getDefaultDate } from '../../../functions/functions';

const now = getDefaultDate();
// prettier-ignore
export const DummyProductTagColumn = {
    id: '', name: '', createAt: now
};
export type IProductTagColumn = typeof DummyProductTagColumn;
