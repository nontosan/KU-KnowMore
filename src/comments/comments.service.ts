import { Body, Get, Injectable, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateCommentsDto } from '../dto/create-comments.dto';

import Comments  from './comments.entity';

import { Report_Service } from '../reports/reports.service';

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
    async find(comment_id: ObjectID): Promise<Comments[]> {
        return this.commentsRepository.find({where:{_id: comment_id}});
    }
    async create(createCommentsDto: CreateCommentsDto) {
        return this.commentsRepository.save(createCommentsDto);
    }
    async delete(comment_id: ObjectID) {
        let removeComment = await this.commentsRepository.find({where:{_id: comment_id}})
        return this.commentsRepository.remove(removeComment[0])
    }
}