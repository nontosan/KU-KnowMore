import {Comment_Sch} from "../interfaces/comment"

export async function fetchComment():Promise<Comment_Sch[]>{
    const res = await fetch("http://ku-knowmore.xyz/comments")
    const comments = await res.json()
    //console.log(comments);
    return comments
}

export default{
    fetchComment
}