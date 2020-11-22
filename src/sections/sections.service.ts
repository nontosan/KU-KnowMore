import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Sections from './sections.entity';
import Attachments from 'src/attachments/attachments.entity';
import recycleSections from './recyclesection.entity';

import { CreateSectionDto } from 'src/dto/create-section.dto';
import { Attachment_Service } from 'src/attachments/attachments.service';

@Injectable()
export class Section_Service {
    constructor(@InjectRepository(Sections)
        private Section_Repository: Repository<Sections>,
        private attachmentService: Attachment_Service,
        @InjectRepository(recycleSections)
        private Recycle_Repository: Repository<recycleSections>,    
        ) {}

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
        var result = await this.Section_Repository.save(create)
        try {
            attachmentArrays.forEach(element => { this.attachmentService.create(element, result.id) });
        } catch (error) {}
        return result
    }
    async update(section_id: string, updateSection: Sections) {
        return this.Section_Repository.update(section_id, updateSection);
    }

    async delete(section_id: string) {
        var Sections=await this.findSectionsID(new ObjectID(section_id));
        var saveSection={
            "old_id":Sections[0].id,
            "section_name":Sections[0].section_name,
            "content":Sections[0].content,
            "blog_id":Sections[0].blog_id
        }
        await this.Recycle_Repository.save(saveSection)
        try{
            await this.Section_Repository.delete(section_id);
            return { "status": section_id.toString() + " have been successfully moved"};
        } catch (error) {
            return {
                "statusCode": 500,
                "message": "Internal server error"
            }
        }
    }
}