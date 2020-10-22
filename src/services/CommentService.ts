import { Comment_Sch } from '../interfaces/comment';

async function fetchComment(blogId:string): Promise<Comment_Sch[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogId}/comments`);
    const comments = await res.json();
    return comments;  
}



async function createComment(comment:any): Promise<Comment_Sch> {
    console.log(comment)
    const res = await fetch(`http://188.166.178.33:3000/comments`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment),
    });
    const comments=await res.json()
    return comments
}



export default {
  createComment,fetchComment
};