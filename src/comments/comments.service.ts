import { Body, Get, Injectable, Post } from '@nestjs/common';

import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateCommentsDto } from '../dto/create-comments.dto';
import Comments  from './comments.entity';

@Injectable()
export class CommentsService {
    constructor( 
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    ){}
    getDate() : string {
        var today = new Date();
        var day = today.getDate().toString();
        var month = today.getMonth()+1;
        var year = today.getFullYear();

        day = day.length == 1 ? '0' + day : day

        return day + '/' + month + '/' + year
    }

    async findAll(): Promise<Comments[]> {
        return this.commentsRepository.find();
    }
    async find(BlogID:string): Promise<Comments[]> {
        return this.commentsRepository.find({where:{blog_id:BlogID}});
    }
    async create(createCommentsDto: CreateCommentsDto) {
        return this.commentsRepository.save(createCommentsDto);
      }
}