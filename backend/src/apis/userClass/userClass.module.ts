import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClassEntity } from './entities/userClass.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserClassEntity, //
        ]),
    ],
    controllers: [],
})
export class UserClassModule {}
