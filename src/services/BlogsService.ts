import { Blog, Review ,create_Blog,} from '../interfaces/blog';
import { Section } from '../interfaces/Section';

async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs`);
    const blogs = await res.json();
    return blogs;  
}

async function createBlog(newBlog: create_Blog): Promise<Blog|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs`,{
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

async function createReview(newReview: Review, blogid:string): Promise<Review|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogid}/reviews`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newReview),
    });
    const savedNewReview: Review = await res.json();
    if (savedNewReview !== undefined) {
        return savedNewReview;
    } else{
        return null;
    }
}

async function fetchReviewOfBlog(blogid:string): Promise<Review[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogid}/reviews`);
    const reviewInfo = await res.json();
    return reviewInfo;  
}

async function fetchReviewSpecific(reviewid:string): Promise<Review|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/reviews/${reviewid}`);
    const reviewInfo = await res.json();
    return reviewInfo;  
}


async function fetchBlogSpecific(blogid:string): Promise<Blog[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogid}`);
    //console.log(blogid)
    const blogInfo = await res.json();
    return blogInfo;  
}

async function fetchBlogfilter(blogid:string): Promise<Blog[]> {
    const api:string = `https://backend.ku-knowmore.xyz/blogs/search/`+blogid
    console.log(api)
    const res = await fetch(api);
    const blog = await res.json();
    return blog;  
}

async function fetchKnowledgeBlogs(): Promise<Blog[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/search/?type=1`);
    const blogs = await res.json();
    return blogs;  
}

async function fetchReviewBlogs(): Promise<Blog[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/search/?type=2`);
    const blogs = await res.json();
    return blogs;  
}

async function deleteBlog(blogid:string): Promise<string> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogid}`,{
        method: 'DELETE',
    });
    const blogs = await res.json();
    return blogs;  
}

async function fetchSectionOfBlog(blogid:string): Promise<Section[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogid}/sections`);
    const sections = await res.json();
    return sections;  
}


async function editBlog(newcoursecode: create_Blog, blogId:string): Promise<Blog|null> {
    console.log(newcoursecode)
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newcoursecode),
    });
    console.log(res)
    const newblog: Blog = await res.json();
    if (newblog !== undefined) {
        return newblog;
    } else{
        return null;
    }
}

async function deleteReport(blogid:string): Promise<string> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/reports/${blogid}`,{
        method: 'DELETE',
    });
    const blogs = await res.json();
    return blogs;  
}

export default {
    fetchBlogs,createBlog,fetchBlogSpecific,fetchBlogfilter,fetchKnowledgeBlogs,fetchReviewBlogs,
    deleteBlog,createReview,fetchReviewSpecific,fetchReviewOfBlog,editBlog,deleteReport
};