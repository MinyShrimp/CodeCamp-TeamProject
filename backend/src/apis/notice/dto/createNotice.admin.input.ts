import { NoticeEntity } from '../entities/notice.entity';
export interface CreateNoticeAdminInput
    extends Pick<NoticeEntity, 'title' | 'contents' | 'isTop'> {}
