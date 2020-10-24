import { Course } from '../interfaces/course'

async function fetchCourseFilter(course_code:string,teacher_name:string): Promise<Course[]> {
    const res = await fetch(`http://188.166.178.33:3000/courses/search/?code=${course_code}`);
    const courseInfo = await res.json();
    return courseInfo;  
}


export default { fetchCourseFilter };

