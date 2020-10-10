import { Module } from '@nestjs/common';
import { CommentsController }  from './comments.controller';
import { CommentsService } from './comments.service';
import Comments from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      TypeOrmModule.forFeature([Comments]),
      ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
