import { RawDraftContentState } from "draft-js";

export interface Blog{
    id?: string;
    user_id: string;
    type: string;
    blog_name: string;
    course_id: string;
    //subject_name
    //teacher_name
    last_edit?: Date;
    viewers?: number;
}
