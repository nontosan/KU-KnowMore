import { Blog } from '../interfaces/blog';

async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs`);
    const blogs = await res.json();
    return blogs;  
}

export default {
    fetchBlogs,
};