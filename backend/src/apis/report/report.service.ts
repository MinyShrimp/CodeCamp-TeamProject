import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserService } from '../user/user.service';
import { CancelReportDto } from './dto/cancelReport.dto';
import { createReportDto } from './dto/createReport.dto';
import { ReportEntity } from './entities/report.entity';
import { ReportRepository } from './entities/report.repository';

@Injectable()
export class ReportService {
    constructor(
        private readonly userService: UserService,
        private readonly reportRepository: ReportRepository, //
    ) {}

    // 존재 체크
    async checkValid(
        dto: CancelReportDto, //
    ): Promise<boolean> {
        const check = await this.reportRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return true;
    }

    // 등록
    async create(
        dto: createReportDto, //
    ): Promise<ReportEntity> {
        const { userID, ...input } = dto;

        // 회원 체크
        const user = await this.userService.checkValid(dto.userID);

        // TODO:
        // dto.reportUUID 검사

        // 생성
        return await this.reportRepository.save({
            ...input,
            user: user,
        });
    }

    // 등록 취소
    async cancel(
        dto: CancelReportDto, //
    ): Promise<boolean> {
        // 존재 체크
        await this.checkValid(dto);

        // Soft Delete
        const result = await this.reportRepository.softDelete(dto.reportID);
        return result.affected ? true : false;
    }
}
