// IMPORT LIBRARY //
import React, { useEffect , useState , Component  } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from 'react-router-dom';
import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import Filtermodel from '../modals/filter'
import UserAuthor from './UserAuthor';
import FilterBar from './NewSearchFilter';
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
    const [showFilter,setShowFilter] = useState<boolean>(false);
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
    useEffect(()=>{
        fetchfilter()
        //window.location.reload()
    },[Url])
    return(
        <div>
            <div className="main-div-main">
                <Filtermodel />
            </div>
            <button className="main-div-main" onClick={() => setShowFilter(!showFilter)}>
                filter
            </button>
            {true&&
                <div className="hot-kl filter-bar">
                    <FilterBar />
                </div>
            }
            <div className="hot-kl">
            {blogs.map(blog => ( 
                <div>
                    {true &&
                        <Link className={`show-all-blog ${blog.type}`} to={`/${blog.type}/${blog.id}`}>
                            <div className="blog-fl">
                                {blog.blog_name}
                            </div>
                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                {blog.viewers} View
                            </div>
                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                Last Edit : {blog.last_edit}
                            </div>
                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                <UserAuthor
                                    userid = {blog.user_id}
                                />
                            </div>
                        </Link>
                }
            
                    {false &&
                        <ListGroup.Item className="blogcontainer" >
                            <button id={blog.id} className="blogclick" onClick={readblog}>
                                <div className="element">{blog.blog_name}</div>
                                <div className="element">  viwer {blog.viewers}</div>
                                <div className="element">  last edit {blog.last_edit}</div>
                            </button>
                        </ListGroup.Item>
                    }
                </div>
            ))}
            </div>
        </div>
    )
}
export default SearchFilter