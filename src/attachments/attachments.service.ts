import { Body, Get,Delete, Injectable, Post } from '@nestjs/common';

import { ObjectID } from 'mongodb';

import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateCommentsDto } from '../dto/create-comments.dto';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

import Attachments  from './attachments.entity';
import Sections from 'src/sections/sections.entity';
import { async } from 'rxjs';

@Injectable()
export class Attachment_Service {
    constructor(@InjectRepository(Attachments)
                private attachmentsRepository: Repository<Attachments>,
                ) {}

    async findAll(): Promise<Attachments[]> {
        return this.attachmentsRepository.find();
    }
    async find(atm_id: ObjectID): Promise<Attachments[]> {
        return this.attachmentsRepository.find({where:{_id: atm_id}});
    }
    async create(atm, section_id): Promise<Attachments[]> {
        var res: Attachments[] = [];
        for (const ele of atm) {
            var atm_dto: CreateAttachmentDto = {
                "filename": ele.filename,
                "originalname": ele.originalname,
                "path": ele.path,
                "size": ele.size,
                "type": ele.mimetype,
                "section_id": section_id
            };
            res.push(await this.attachmentsRepository.save(atm_dto));
        }
        return res 
    }

    async delete(id: string): Promise<void> {
        await this.attachmentsRepository.delete(id);
    }
    async findAttachmentSection(section_id: string): Promise<Attachments[]>{
        return this.attachmentsRepository.find({where: { section_id: section_id }});
    }
}