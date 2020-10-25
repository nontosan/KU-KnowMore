import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Sections from './sections.entity';
import Attachments from 'src/attachments/attachments.entity';

import { CreateSectionDto } from 'src/dto/create-section.dto';
import { Attachment_Service } from 'src/attachments/attachments.service';

@Injectable()
export class Section_Service {
    constructor(@InjectRepository(Sections)
        private Section_Repository: Repository<Sections>,
        private attachmentService: Attachment_Service) {}

    async findAllSections() : Promise<Sections[]> {  
        return this.Section_Repository.find();
    }
    async findSectionsID(section_id: ObjectID): Promise<Sections[]> {
        return this.Section_Repository.find({where: { _id: section_id }});
    }
    async findSectionsBlogs(blog_id: string): Promise<Sections[]> {
        return this.Section_Repository.find({where: { blog_id: blog_id }});
    }
    async createSections(create: CreateSectionDto, attachmentArrays) {
        var result = this.Section_Repository.save(create).then( res => {
            attachmentArrays.forEach(element => { this.attachmentService.create(element, res.id) });
        });
        return result
    }
    async update(section_id: string, updateSection: Sections) {
        return this.Section_Repository.update(section_id, updateSection);
    }
    async delete(section_id: string) {
        return this.Section_Repository.delete(section_id);
    }

}