import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Reports from './reports.entity';
import { CreateReportDto } from '../dto/create-reports.dto';

@Injectable()
export class Report_Service {
    constructor(
        @InjectRepository(Reports)
        private Report_Repository: Repository<Reports>,
    ) {}

    async findAllReports() : Promise<Reports[]> {  
        return this.Report_Repository.find();
    }
    async findReportsID(report_id: ObjectID): Promise<Reports[]> {
        return this.Report_Repository.find({where: { _id: report_id }});
    }
    async createReport(create: CreateReportDto) {
        return this.Report_Repository.save(create);
    }
    async delete(report_id: ObjectID) {
        let removeReport = await this.Report_Repository.find({where:{_id: report_id}})
        return this.Report_Repository.remove(removeReport[0])
    }
}