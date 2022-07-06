import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository
            .createQueryBuilder('product')
            .orderBy('product.price')
            .getMany();
    }
}
