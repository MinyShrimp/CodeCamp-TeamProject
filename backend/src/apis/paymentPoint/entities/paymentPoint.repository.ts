import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { Connection, IsNull, Not, QueryRunner, Repository } from 'typeorm';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import { UserRepository } from 'src/apis/user/entities/user.repository';
import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';
import { PaymentPointStatusEntity } from 'src/apis/paymentPointStatus/entities/paymentPointStatus.entity';

import { PaidDto } from '../dto/paid.dto';
import { CancelDto } from '../dto/cancel.dto';
import { DonateDto } from '../dto/donate.dto';

import { PaymentPointEntity } from './paymentPoint.entity';

@Injectable()
export class PaymentPointRepository {
    constructor(
        @InjectRepository(PaymentPointEntity)
        private readonly paymentPointRepository: Repository<PaymentPointEntity>,

        private readonly connection: Connection,
        private readonly userRepository: UserRepository,
    ) {}

    private readonly take = 10;
    private readonly point = 100;

    /**
     * 유저 기반 소설 결제 조회
     */
    async findPointPaymentsInNovel(
        userID: string, //
        page: number,
    ): Promise<PaymentPointEntity[]> {
        return await this.paymentPointRepository.find({
            where: {
                userID: userID,
                novel: Not(IsNull()),
            },
            relations: [
                'status',
                'novel',
                'novel.user',
                'novel.user.userClass',
            ],
            order: {
                createAt: 'ASC',
            },
            take: this.take,
            skip: this.take * (page - 1),
        });
    }

    /**
     * 유저 기반 에피소드 결제 조회
     */
    async findPointPaymentsInIndex(
        userID: string, //
        page: number,
    ): Promise<PaymentPointEntity[]> {
        return await this.paymentPointRepository.find({
            where: {
                userID: userID,
                novelIndex: Not(IsNull()),
            },
            relations: [
                'status',
                'novelIndex',
                'novelIndex.user',
                'novelIndex.user.userClass',
            ],
            order: {
                createAt: 'ASC',
            },
            take: this.take,
            skip: this.take * (page - 1),
        });
    }

    // 존재 확인
    async checkValid(
        dto: CancelDto, //
    ): Promise<PaymentPointEntity> {
        return await this.paymentPointRepository
            .createQueryBuilder('pp')
            .select(['pp.id', 'pp.userID'])
            .where('pp.id=:id', { id: dto.paymentPointID })
            .andWhere('pp.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    // 중복 확인
    async checkOverlap(
        dto: PaidDto, //
    ): Promise<PaymentPointEntity> {
        return await this.paymentPointRepository
            .createQueryBuilder('pp')
            .select(['pp.id', 'pp.userID', 'pp.novelIndexID'])
            .where('pp.userID=:userID', { userID: dto.userID })
            .andWhere('pp.novelIndexID=:novelIndexID', {
                novelIndexID: dto.novelIndexID,
            })
            .getOne();
    }

    private async transaction(
        callback: (queryRunner: QueryRunner) => Promise<PaymentPointEntity>,
    ): Promise<PaymentPointEntity> {
        const queryRunner = this.connection.createQueryRunner();

        // 트랜잭션 시작
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        let payment: PaymentPointEntity = null;

        try {
            // callback
            payment = await callback(queryRunner);

            // 커밋
            await queryRunner.commitTransaction();
        } catch (e) {
            // 롤백
            await queryRunner.rollbackTransaction();
        } finally {
            // 트랜잭션 종료
            await queryRunner.release();
        }

        return payment;
    }

    // 일반 결제
    async paid(
        dto: PaidDto, //
    ): Promise<PaymentPointEntity> {
        return await this.transaction(
            async (
                queryRunner: QueryRunner, //
            ): Promise<PaymentPointEntity> => {
                // 신청한 유저
                const paidUser = await queryRunner.manager.findOne(
                    UserEntity,
                    { id: dto.userID },
                    { lock: { mode: 'pessimistic_write' } },
                );

                // 소지 금액 확인
                if (paidUser.point < this.point) {
                    throw new ConflictException(MESSAGES.NOT_ENOUGH_POINT);
                }

                // 에피소드
                const novelIndex = await queryRunner.manager.findOne(
                    NovelIndexEntity,
                    { id: dto.novelIndexID },
                    {
                        lock: { mode: 'pessimistic_write' },
                        relations: ['user'],
                    },
                );

                // 작가 가져오기
                const authorUser = novelIndex.user;

                // 자기 자신 결제 체크
                if (paidUser.id === authorUser.id) {
                    throw new ConflictException(MESSAGES.DO_NOT_SELF_PAID);
                }

                // 결제 상태
                const status = await queryRunner.manager.findOne(
                    PaymentPointStatusEntity,
                    { id: 'PAID' },
                );

                // 결제 DB에 추가
                const payment = this.paymentPointRepository.create({
                    user: paidUser,
                    status: status,
                    novelIndex: novelIndex,
                    point: this.point,
                });
                await queryRunner.manager.save(payment);

                // 회원 포인트 수정 ( -100P )
                const updateUser = this.userRepository.create({
                    ...paidUser,
                    point: paidUser.point - this.point,
                });
                await queryRunner.manager.save(updateUser);

                // 작가 포인트 수정 ( +100P )
                const updateAuthor = this.userRepository.create({
                    ...authorUser,
                    point: authorUser.point + this.point,
                });
                await queryRunner.manager.save(updateAuthor);

                return payment;
            },
        );
    }

    // 후원 결제
    async donate(
        dto: DonateDto, //
    ): Promise<PaymentPointEntity> {
        return await this.transaction(async (queryRunner: QueryRunner) => {
            // 신청한 유저
            const paidUser = await queryRunner.manager.findOne(
                UserEntity,
                { id: dto.userID },
                { lock: { mode: 'pessimistic_write' } },
            );

            // 소지 금액 확인
            if (paidUser.point < dto.point) {
                throw new ConflictException(MESSAGES.NOT_ENOUGH_POINT);
            }

            // 소설
            const novel = await queryRunner.manager.findOne(
                NovelEntity,
                { id: dto.novelID },
                {
                    lock: { mode: 'pessimistic_write' },
                    relations: ['user'],
                },
            );

            // 작가 가져오기
            const authorUser = novel.user;

            // 자기 자신 결제 체크
            if (paidUser.id === authorUser.id) {
                throw new ConflictException(MESSAGES.DO_NOT_SELF_DONATE);
            }

            // 결제 상태
            const status = await queryRunner.manager.findOne(
                PaymentPointStatusEntity,
                { id: 'DONATE' },
            );

            // 결제 DB에 추가
            const payment = this.paymentPointRepository.create({
                user: paidUser,
                status: status,
                novel: novel,
                point: dto.point,
            });
            await queryRunner.manager.save(payment);

            // 회원 포인트 수정
            const updateUser = this.userRepository.create({
                ...paidUser,
                point: paidUser.point - dto.point,
            });
            await queryRunner.manager.save(updateUser);

            // 작가 포인트 수정
            const updateAuthor = this.userRepository.create({
                ...authorUser,
                point: authorUser.point + dto.point,
            });
            await queryRunner.manager.save(updateAuthor);

            return payment;
        });
    }

    // 결제 취소
    async cancel(
        dto: CancelDto, //
    ): Promise<PaymentPointEntity> {
        return await this.transaction(
            async (
                queryRunner: QueryRunner, //
            ) => {
                // 신청한 유저 ( 잠금 )
                await queryRunner.manager.findOne(
                    UserEntity,
                    { id: dto.userID },
                    { lock: { mode: 'pessimistic_write' } },
                );

                // 결제 정보
                const paymentPoint = await queryRunner.manager.findOne(
                    PaymentPointEntity,
                    { id: dto.paymentPointID },
                    {
                        lock: { mode: 'pessimistic_write' },
                        relations: ['user', 'novel', 'novelIndex'],
                    },
                );

                // 결제 상태
                const status = await queryRunner.manager.findOne(
                    PaymentPointStatusEntity,
                    { id: 'CANCELLED' },
                );

                const point = paymentPoint.point;
                const paidUser = paymentPoint.user;

                if (paymentPoint.novel) {
                    const novel = paymentPoint.novel;
                    const author = novel.user;

                    // 결제 DB에 추가
                    const payment = this.paymentPointRepository.create({
                        user: paidUser,
                        status: status,
                        novel: novel,
                        point: point * -1,
                    });
                    await queryRunner.manager.save(payment);

                    // 회원 포인트 수정
                    const updateUser = this.userRepository.create({
                        ...paidUser,
                        point: paidUser.point + point,
                    });
                    await queryRunner.manager.save(updateUser);

                    // 작가 포인트 수정
                    const updateAuthor = this.userRepository.create({
                        ...author,
                        point: author.point - point,
                    });
                    await queryRunner.manager.save(updateAuthor);

                    return payment;
                } else {
                    const novelIndex = paymentPoint.novelIndex;
                    const author = novelIndex.user;

                    // 결제 DB에 추가
                    const payment = this.paymentPointRepository.create({
                        user: paidUser,
                        point: point * -1,
                        status: status,
                        novelIndex: novelIndex,
                    });
                    await queryRunner.manager.save(payment);

                    // 회원 포인트 수정
                    const updateUser = this.userRepository.create({
                        ...paidUser,
                        point: paidUser.point + point,
                    });
                    await queryRunner.manager.save(updateUser);

                    // 작가 포인트 수정
                    const updateAuthor = this.userRepository.create({
                        ...author,
                        point: author.point - point,
                    });
                    await queryRunner.manager.save(updateAuthor);

                    return payment;
                }
            },
        );
    }
}
