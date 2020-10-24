import { Like } from '../interfaces/Like';

async function fetchLike(blogId:string): Promise<Like[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogId}/likes`);
    const likes = await res.json();
    return likes;  
}

async function createLike(blogId:string,data:any): Promise<boolean> {
  const res = await fetch(`http://188.166.178.33:3000/Blogs/${blogId}/like`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
  });
  const islike:string = await res.json();
  if(islike==="like"){
    return true
  }
  else if(islike==="unlike"){
    return false
  }
  else{
    console.log("cant like")
  }
  return false
}




export default {
  fetchLike,createLike
};