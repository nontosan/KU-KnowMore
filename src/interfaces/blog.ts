
export interface Blog{
    id?: string;
    course_id: string;
    user_id: string;
    type: string;
    viewers?: number;
    blog_name: string;
    last_edit?: Date;
}