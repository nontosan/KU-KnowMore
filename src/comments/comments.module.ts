import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController }  from './comments.controller';
import { CommentsService } from './comments.service';

import Comments from './comments.entity';

import { Report_Module } from 'src/reports/reports.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([Comments]),
      Report_Module,
      ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
