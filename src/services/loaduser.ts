import { User_Sch} from "../interfaces/user"
import { Comment_Sch} from "../interfaces/comment"

export async function fetchUser(comment:Comment_Sch):Promise<User_Sch>{
    //we need to specific who we want to get infomation using comment.user_id
    const res = await fetch("server path get all section")
    const user = await res.json()
    return user
} 
export default {fetchUser}