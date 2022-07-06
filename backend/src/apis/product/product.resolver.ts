import { Query, Resolver } from '@nestjs/graphql';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productRepository: ProductRepository, //
    ) {}

    @Query(
        () => [ProductEntity],
        { description: '모든 상품 목록 가져오기' }, //
    )
    fetchProductsAll(): Promise<ProductEntity[]> {
        return this.productRepository.findAll();
    }
}
