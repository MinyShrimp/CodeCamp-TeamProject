import { NoticeEntity } from '../entities/notice.entity';
export interface CreateNoticeAdminInput extends Omit<NoticeEntity, 'id'> {}
