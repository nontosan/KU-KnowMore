import { Body, Get,Delete, Injectable, Post } from '@nestjs/common';

import { ObjectID } from 'mongodb';

import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateCommentsDto } from '../dto/create-comments.dto';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

import Attachments  from './attachments.entity';
import Sections from 'src/sections/sections.entity';

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
    async create(atm, section_id) {
        var atm_dto: CreateAttachmentDto = {
            "filename": atm.filename,
            "originalname": atm.originalname,
            "path": atm.path,
            "size": atm.size,
            "type": atm.mimetype,
            "section_id": section_id
        }
        return this.attachmentsRepository.save(atm_dto)
    }
    async delete(id: string): Promise<void> {
        await this.attachmentsRepository.delete(id);
    }
    async findAttachmentSection(section_id: string): Promise<Attachments[]>{
        return this.attachmentsRepository.find({where: { section_id: section_id }});
    }
}