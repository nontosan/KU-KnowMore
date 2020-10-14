import { RawDraftContentState } from "draft-js";

export interface Section{
    id?: string;
    section_name: string;
    content: any;
    blog_id: string;
};