import { Blog, Review ,create_Blog } from '../interfaces/blog';

async function editReview(editReview: Review, reviewid:string): Promise<Review|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/reviews/${reviewid}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.accessToken}`,
        },
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