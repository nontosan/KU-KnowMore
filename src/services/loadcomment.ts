import {Comment_Sch} from "../interfaces/comment"

export async function fetchComment():Promise<Comment_Sch[]>{
    const res = await fetch("http://localhost:3000/.....path..to..comment")
    const comments = await res.json()
    return comments
}

export default{
    fetchComment
}