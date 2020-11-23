import { Like } from '../interfaces/Like';
import { isConditionalExpression } from 'typescript';
import { yupToFormErrors } from 'formik';

async function fetchLike(blogId:string): Promise<Like[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/likes`);
    const likes = await res.json();
    return likes;  
}

async function fetchView(blogId:string): Promise<Like[]> {
  const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/viewing`);
  const views = await res.json();
  return views;  
}

async function createLike(blogId:string,data:any): Promise<boolean> {
  //console.log(blogId,data)
  //console.log(JSON.stringify(data))
  const islike = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/likes`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.accessToken}`,
        },
        body: JSON.stringify({"user_id":localStorage.userId}),
    });
    const like = await islike.json();
    //console.log(like)
    if(like.Status==="Like"){
      return true
    }
    else if(like.Status==="Unlike"){
      return false
    }
    else{
      //console.log("cant like")
    }
  return true
}
  /*
  if(islike==="like"){
    return true
  }
  else if(islike==="unlike"){
    return false
  }
  else{
    console.log("cant like")
  }
  */





export default {
  fetchLike,createLike,fetchView
};