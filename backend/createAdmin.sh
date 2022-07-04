#!/bin/bash

FILENAME=$1

APIDIR=./src/apis/$FILENAME
UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${FILENAME:0:1})${FILENAME:1}"

mkdir $APIDIR
mkdir $APIDIR/entities
mkdir $APIDIR/dto

##############################################################################
# Module
MODULE_FILE=$APIDIR/$FILENAME.module.ts
echo "import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ${UPPER}Entity } from './entities/${FILENAME}.entity';
import { ${UPPER}AdminRepository } from './entities/${FILENAME}.admin.repository';

import { ${UPPER}AdminController } from './${FILENAME}.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ${UPPER}Entity, //
        ]),
    ],
    controllers: [
        ${UPPER}AdminController, //
    ],
    providers: [
        ${UPPER}AdminRepository, //
    ],
})
export class ${UPPER}Module {}" >> $MODULE_FILE

##############################################################################
# AdminRepository
ADMIN_REPO_FILE=$APIDIR/entities/$FILENAME.admin.repository.ts
echo "import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Create${UPPER}AdminInput } from '../dto/create${UPPER}.admin.input';
import { Update${UPPER}AdminInput } from '../dto/update${UPPER}.admin.input';

import { ${UPPER}Entity } from './${FILENAME}.entity';

@Injectable()
export class ${UPPER}AdminRepository {
    constructor(
        @InjectRepository(${UPPER}Entity)
        private readonly ${FILENAME}Repository: Repository<${UPPER}Entity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<${UPPER}Entity[]> {
        return await this.${FILENAME}Repository
            .createQueryBuilder('${FILENAME}')
            .select(this._selector)
            .withDeleted()
            .orderBy('${FILENAME}.createAt')
            .getMany();
    }

    async findAllNames(): Promise<${UPPER}Entity[]> {
        return await this.${FILENAME}Repository
            .createQueryBuilder('${FILENAME}')
            .select(['${FILENAME}.id', '${FILENAME}.name'])
            .orderBy('${FILENAME}.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<${UPPER}Entity> {
        return await this.${FILENAME}Repository
            .createQueryBuilder('${FILENAME}')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('${FILENAME}.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: Create${UPPER}AdminInput, //
    ): Promise<${UPPER}Entity> {
        return await this.${FILENAME}Repository.save(input);
    }

    async update(
        input: Update${UPPER}AdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.${FILENAME}Repository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.${FILENAME}Repository.delete({
                    id: id,
                }),
            ),
        );
    }
}" >> $ADMIN_REPO_FILE

##############################################################################
# AdminController
ADMIN_CONT_FILE=$APIDIR/$FILENAME.admin.controller.ts
echo "// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/title.admin.output';

import { Create${UPPER}AdminInput } from './dto/create${UPPER}.admin.input';
import { Update${UPPER}AdminInput } from './dto/update${UPPER}.admin.input';

import { ${UPPER}Entity } from './entities/${FILENAME}.entity';
import { ${UPPER}AdminRepository } from './entities/${FILENAME}.admin.repository';

@Controller('admin/${FILENAME}')
export class ${UPPER}AdminController {
    constructor(
        private readonly ${FILENAME}AdminRepository: ${UPPER}AdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<${UPPER}Entity[]> {
        return this.${FILENAME}AdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.${FILENAME}AdminRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.name };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<${UPPER}Entity> {
        return this.${FILENAME}AdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: Create${UPPER}AdminInput, //
    ): Promise<${UPPER}Entity> {
        return this.${FILENAME}AdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: Update${UPPER}AdminInput, //
    ): Promise<boolean> {
        const result = await this.${FILENAME}AdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.${FILENAME}AdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}" >> $ADMIN_CONT_FILE

##############################################################################
# CreateAdminInput
ADMIN_CREATE_INPUT_FILE=$APIDIR/dto/create$UPPER.admin.input.ts
echo "import { ${UPPER}Entity } from '../entities/${FILENAME}.entity';
export interface Create${UPPER}AdminInput extends Omit<${UPPER}Entity, 'id'> {}" >> $ADMIN_CREATE_INPUT_FILE

##############################################################################
# UpdateAdminInput
ADMIN_UPDATE_INPUT_FILE=$APIDIR/dto/update$UPPER.admin.input.ts
echo "import { Create${UPPER}AdminInput } from './create${UPPER}.admin.input';
export interface Update${UPPER}AdminInput
    extends Partial<Create${UPPER}AdminInput> {
    originID: string;
}" >> $ADMIN_UPDATE_INPUT_FILE

##############################################################################
# Entity
ENTITY_FILE=$APIDIR/entities/$FILENAME.entity.ts
echo "import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/* ${UPPER} Entity */
@Entity({ name: '${FILENAME}' })
@ObjectType({ description: '${UPPER} Entity' })
export class ${UPPER}Entity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;
}" >> $ENTITY_FILE

