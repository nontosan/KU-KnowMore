import React, { useEffect , useState , Component  } from 'react';
import Filtermodel from '../modals/filter'
import BlogsService from "../services/BlogsService"
import { Blog } from "../interfaces/blog"
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from 'react-router-dom';



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