import { ProductEntity } from '../entities/product.entity';

export interface CreateProductAdminInput extends Omit<ProductEntity, 'id'> {}
