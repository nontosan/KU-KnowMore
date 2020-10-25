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

export interface Review{
    blog_id : string;
    id?: string;
    teaching: number;
    hw:number;
    classroom:number;
    overall:number;
    content:any;
}
