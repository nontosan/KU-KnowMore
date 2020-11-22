// IMPORT LIBRARY //
import React, { useState,useEffect } from 'react';
import CreateEditSection from './createeditsection';

import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import UserAuthor from './UserAuthor';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService"
import LikeServive from "../services/LikeService"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import {Blog}  from "../interfaces/blog"
import {Like} from "../interfaces/Like"
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/blogforclick.css"
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const ShowLike = (props:any) => {
    const [likes, setLikes] = useState<Number>();
    const fetchLike = () => {
        LikeServive.fetchLike(props.blogid)
        .then(res=>{
            setLikes(res.length)
        })
    }

    useEffect(() => {
        fetchLike();
    },[])
    return (
        <div style={{ display:"inline"}} >
            <LikeTwoTone/>&nbsp;&nbsp;{likes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    )
};

export default ShowLike;