import { Blog } from '../interfaces/blog';

async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs`);
    const blogs = await res.json();
    return blogs;  
}

async function fetchBlogSpecific(blogid:string): Promise<Blog> {
    const api:string = `http://188.166.178.33:3000/blogs`+blogid
    const res = await fetch(api);
    const blog = await res.json();
    return blog;  
}

export default {
    fetchBlogs,fetchBlogSpecific,
};