import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';
import { ProductAdminRepository } from './entities/product.admin.repository';

import { ProductResolver } from './product.resolver';
import { ProductCheckService } from './productCheck.service';
import { ProductAdminController } from './product.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity, //
        ]),
    ],
    exports: [
        ProductRepository, //
        ProductCheckService,
    ],
    controllers: [
        ProductAdminController, //
    ],
    providers: [
        ProductAdminRepository, //

        ProductResolver,
        ProductRepository,
        ProductCheckService,
    ],
})
export class ProductModule {}
