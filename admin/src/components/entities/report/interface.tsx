import { getDefaultDate } from '../../../functions/functions';
import { DummyReportEnumColumn } from '../reportEnum/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyReportColumn = {
    id: '', title: '', contents: '', reportUUID: '', 
    createAt: now, updateAt: now, deleteAt: now,
    enum: DummyReportEnumColumn, user: SimpleDummyUser
};
export type IReportColumn = typeof DummyReportColumn;
