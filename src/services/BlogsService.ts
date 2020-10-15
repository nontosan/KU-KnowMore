import { Blog } from '../interfaces/blog';

async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs`);
    const blogs = await res.json();
    return blogs;  
}

async function createBlog(newBlog: Blog): Promise<Blog|null> {
    const res = await fetch(`http://188.166.178.33:3000/blogs`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBlog),
    });
    const savedNewBlog: Blog = await res.json();
    if (savedNewBlog !== undefined) {
        return savedNewBlog;
    } else{
        return null;
    }
}

async function fetchBlogSpecific(blogid:string): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogid}`);
    const blogInfo = await res.json();
    return blogInfo;  
}

async function fetchBlogfilter(blogid:string): Promise<Blog[]> {
    const api:string = `http://188.166.178.33:3000/blogs/search/`+blogid
    console.log(api)
    const res = await fetch(api);
    const blog = await res.json();
    return blog;  
}

async function fetchKnowledgeBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/search/?type=1`);
    const blogs = await res.json();
    return blogs;  
}

async function fetchReviewBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/search/?type=2`);
    const blogs = await res.json();
    return blogs;  
}

async function deleteBlog(blogid:string): Promise<string> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogid}`,{
        method: 'DELETE',
    });
    const blogs = await res.json();
    return blogs;  
}



export default {
    fetchBlogs,createBlog,fetchBlogSpecific,fetchBlogfilter,fetchKnowledgeBlogs,fetchReviewBlogs,
    deleteBlog,
};