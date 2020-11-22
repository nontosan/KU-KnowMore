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
import ShowLike from './ShowLike';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from "../interfaces/blog"
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/blogforclick.css"
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const SearchFilter=()=>{
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const Url:string = window.location.search
    const [showFilter,setShowFilter] = useState<boolean>(false);
    let location = useLocation()
    console.log(window.location)
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
    },[Url])
    return(
        <div>
            {false &&
                <div>
                    <div className="main-div-main">
                        <Filtermodel />
                    </div>
                    <button className="main-div-main" onClick={() => setShowFilter(!showFilter)}>
                        filter
                    </button>
                </div>
            }
            {true&&
                <div className="filter-bar" style={{ backgroundColor:"pink" }}>
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
                                <ShowLike blogid={blog.id}/>
                                <EyeOutlined />&nbsp;&nbsp;{blog.viewers} 
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