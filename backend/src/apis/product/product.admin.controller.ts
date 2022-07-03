import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateProductAdminInput } from './dto/createProduct.admin.input';
import { UpdateProductAdminInput } from './dto/updateProduct.admin.input';
import { ProductAdminRepository } from './entities/product.admin.repository';
import { ProductEntity } from './entities/product.entity';

@Controller('admin/product')
export class ProductAdminController {
    constructor(
        private readonly productAdminRepository: ProductAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<ProductEntity[]> {
        return this.productAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<string>> {
        const results = await this.productAdminRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<ProductEntity> {
        return this.productAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateProductAdminInput, //
    ): Promise<ProductEntity> {
        return this.productAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateProductAdminInput, //
    ): Promise<boolean> {
        const result = await this.productAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.productAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
