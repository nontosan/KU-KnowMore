// IMPORT LIBRARY //
import React, { useEffect , useState , Component  } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import Filtermodel from '../modals/filter'
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from "../interfaces/blog"
// END OF IMPORT INTERFACE//

//------------------------------------------------------------------//

const SearchFilter=()=>{
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const Url:string = window.location.search
    

    let location = useLocation()

    const fetchfilter = ()=>{
        BlogsService.fetchBlogfilter(Url).then(res=>{
            setBlogs(res)
        })

    }   
    const readblog=()=>{
        console.log("read this blog")
    }
    useEffect(()=>{
        
        fetchfilter()
        //window.location.reload()
    },[])
    return(
        <div>
            <div className="main-div-main">
                <Filtermodel />
            </div>
            {blogs.map(blog => ( 
                <ListGroup.Item className="blogcontainer" >
                    <button id={blog.id} className="blogclick" onClick={readblog}>
                        <div className="element">{blog.blog_name}</div>
                        <div className="element">{blog.course_id}</div>
                        <div className="element">  viwer {blog.viewers}</div>
                        <div className="element">  last edit {blog.last_edit}</div>
                    </button>
                </ListGroup.Item>
            ))}
        </div>
    )
}
export default SearchFilter