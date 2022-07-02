import { getDefaultDate } from '../../../functions/functions';

const now = getDefaultDate();
// prettier-ignore
export const DummyPublisherColumn = {
    id: '', name: '', description: '',
    createAt: now, updateAt: now, deleteAt: now,
};
export type IPublisherColumn = typeof DummyPublisherColumn;
