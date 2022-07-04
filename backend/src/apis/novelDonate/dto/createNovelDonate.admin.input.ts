import { NovelDonateEntity } from '../entities/novelDonate.entity';
export interface CreateNovelDonateAdminInput extends Omit<NovelDonateEntity, 'id'> {}
