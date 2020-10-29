import { Blog, Review ,create_Blog } from '../interfaces/blog';

async function editReview(editReview: Review, reviewid:string): Promise<Review|null> {
    const res = await fetch(`http://188.166.178.33:3000/reviews/${reviewid}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editReview),
    });
    const savedNewReview: Review = await res.json();
    if (savedNewReview !== undefined) {
        return savedNewReview;
    } else{
        return null;
    }
}


export default {
    editReview,
};