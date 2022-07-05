import { CreateProductAdminInput } from './createProduct.admin.input';

export interface UpdateProductAdminInput
    extends Partial<CreateProductAdminInput> {
    originID: string;
}
