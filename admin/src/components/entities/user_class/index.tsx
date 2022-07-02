import { EntityFactory } from '../entity_factory';
import { IUserClassColumn, DummyUserClassColumn } from './interface';

// prettier-ignore
export const UserClassIndex = EntityFactory.getEntity<IUserClassColumn>({
    name: "회원 등급",
    dummyData: DummyUserClassColumn,
    baseURL: '/admin/entity/userClass',
    list: {
        column: [
            'id', 'description',
        ],
        url: "/admin/user-classes"
    },
    show: {
        column: [
            'id', 'description',
        ],
        url: "/admin/user-class"
    },
    edit: {
        column: [
            'id', 'description',
        ],
        url: { 'default': '/admin/user-class' },
        default: {
            id: "", description: ""
        }
    },
    update: {
        column: [
            'id', 'description',
        ],
        url: { 'default': '/admin/user-class' },
        default: {
            id: "", description: ""
        }
    }
});
