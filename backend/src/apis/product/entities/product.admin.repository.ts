import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductAdminInput } from '../dto/createProduct.admin.input';
import { UpdateProductAdminInput } from '../dto/updateProduct.admin.input';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductAdminRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    private readonly _selector = [
        'p.id',
        'p.name',
        'p.description',
        'p.price',
        'p.point',
    ];

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository
            .createQueryBuilder('p')
            .select(this._selector)
            .withDeleted()
            .orderBy('p.price')
            .getMany();
    }

    async findAllNames(): Promise<ProductEntity[]> {
        return await this.productRepository
            .createQueryBuilder('p')
            .select(['p.id', 'p.name'])
            .orderBy('p.price')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<ProductEntity> {
        return await this.productRepository
            .createQueryBuilder('p')
            .select(this._selector)
            .withDeleted()
            .where('p.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateProductAdminInput, //
    ): Promise<ProductEntity> {
        return await this.productRepository.save(input);
    }

    async update(
        input: UpdateProductAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.productRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.productRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
