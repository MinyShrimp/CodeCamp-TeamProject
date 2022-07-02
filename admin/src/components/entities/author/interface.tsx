const now = new Date();
// prettier-ignore
export const DummyAuthorColumn = {
    id: '', name: '', description: '',
    createAt: now, updateAt: now, deleteAt: now,
};
export type IAuthorColumn = typeof DummyAuthorColumn;
