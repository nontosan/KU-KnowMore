import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Reports from './reports.entity';

import { Report_Service } from './reports.service';

@Controller('Reports')
export class Report_Controller {
  constructor(private Service: Report_Service) {}

  @Get()
  async findAllReports(): Promise<Reports[]> {
    return this.Service.findAllReports();
  }
  
  @Get('/:Report_id')
  async findReportsID(@Param('Report_id', ParseObjectIdPipe) Report_id: ObjectID): Promise<Reports[]> {
    return this.Service.findReportsID(Report_id);
  }

}
