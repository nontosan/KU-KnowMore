import { Like } from '../interfaces/Like';
import { isConditionalExpression } from 'typescript';

async function fetchLike(blogId:string): Promise<Like[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/likes`);
    const likes = await res.json();
    return likes;  
}

async function createLike(blogId:string,data:any): Promise<boolean> {
  console.log(blogId,data)
  try{
    const res = await fetch(`https://backend.ku-knowmore.xyz/blogs/${blogId}/likes`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    console.log(res.json())
    const islike:string = await res.json();
    console.log(res.body)
    return true
  }catch{
    console.log("error")
    return false
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
}




export default {
  fetchLike,createLike
};