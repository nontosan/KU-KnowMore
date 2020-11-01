import { Comment_Sch } from '../interfaces/comment';

async function fetchComment(blogId:string): Promise<Comment_Sch[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/comments`);
    const comments = await res.json();
    return comments;  
}



async function createComment(comment:any): Promise<Comment_Sch> {
    console.log(comment)
    const res = await fetch(`https://backend.ku-knowmore.xyz/comments`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment),
    });
    const comments = await res.json()
    return comments
}



export default {
  createComment,fetchComment
};