import { Like } from '../interfaces/Like';

async function fetchLike(blogId:string): Promise<Like[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogId}/likes`);
    const likes = await res.json();
    return likes;  
}





export default {
  fetchLike
};