import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Sections from './sections.entity';

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

}