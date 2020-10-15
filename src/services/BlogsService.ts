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

<<<<<<< HEAD
async function fetchBlogSpecific(blogid:string): Promise<Blog[]> {
=======
<<<<<<< HEAD
async function fetchBlogSpecific(blogid:string): Promise<Blog[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogid}`);
    const blogInfo = await res.json();
    return blogInfo;  
=======
async function fetchBlogSpecific(blogid:string): Promise<Blog> {
>>>>>>> 70f9acacb18d292f1b5fd21ee8056f704c4e35c8
    const api:string = `http://188.166.178.33:3000/blogs/`+blogid
    const res = await fetch(api);
    const blog = await res.json();
    return blog;  
>>>>>>> fdfedf3dbe1799fcc1bc4648f7fdb544e6147884
}

async function fetchBlogfilter(blogid:string): Promise<Blog[]> {
    const api:string = `http://188.166.178.33:3000/blogs/search/`+blogid
    console.log(api)
    const res = await fetch(api);
    const blog = await res.json();
    return blog;  
}



export default {
    fetchBlogs,createBlog,fetchBlogSpecific,fetchBlogfilter,
};