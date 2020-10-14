import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Sections from './sections.entity';
import { CreateSectionDto } from 'src/dto/create-section.dto';

@Injectable()
export class Section_Service {
    constructor(
        @InjectRepository(Sections)
        private Section_Repository: Repository<Sections>,
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
    async createSections(create: CreateSectionDto) {
        return this.Section_Repository.save(create);
    }
    async update(section_id: string, updateSection: Sections) {
        return this.Section_Repository.update(section_id, updateSection);
    }

}