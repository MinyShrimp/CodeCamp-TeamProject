import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAdminRepository } from './entities/product.admin.repository';
import { ProductEntity } from './entities/product.entity';
import { ProductAdminController } from './product.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity, //
        ]),
    ],
    controllers: [
        ProductAdminController, //
    ],
    providers: [
        ProductAdminRepository, //
    ],
})
export class ProductModule {}
