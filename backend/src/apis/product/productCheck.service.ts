import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';

@Injectable()
export class ProductCheckService {
    constructor() {}

    checkValid(
        product: ProductEntity, //
    ): ProductEntity {
        if (product === undefined) {
            throw new ConflictException(
                MESSAGES.PRODUCT_FIND_ONE_FAILED, //
            );
        }
        return product;
    }
}
