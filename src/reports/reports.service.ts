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
    getDate() {
        var today = new Date();
        var day = today.getDate().toString();
        var month = (today.getMonth()+1).toString();
        var year = today.getFullYear();
        var hour = today.getHours().toString();
        var minute = today.getMinutes().toString();
    
        day = day.length == 1 ? '0' + day : day
        month = month.length == 1 ? '0' + month : month
        hour = hour.length == 1 ? '0' + hour : hour
        minute = minute.length == 1 ? '0' + minute : minute
    
        return hour + ':' + minute + ' ' + day + '/' + month + '/' + year
    }
    async findAllReports() : Promise<Reports[]> {  
        return this.Report_Repository.find();
    }
    async findReportsID(report_id: ObjectID): Promise<Reports[]> {
        return this.Report_Repository.find({where: { _id: report_id }});
    }
    async createReport(create: CreateReportDto) {
        create.date_time = this.getDate();
        return this.Report_Repository.save(create);
    }
    async delete(report_id: ObjectID) {
        let removeReport = await this.Report_Repository.find({where:{_id: report_id}})
        return this.Report_Repository.remove(removeReport[0])
    }
    async deletereportbyblog(blog_id:string){
        const repotkub=await this.Report_Repository.find({where:{content_id:blog_id}});
        this.Report_Repository.remove(repotkub);
    }
}