// IMPORT LIBRARY //
import React, { useEffect , useState , Component, Suspense  } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import BlogsService from '../../services/BlogsService';
import ProfileService from '../../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from '../../interfaces/blog';
import { User_Sch } from '../../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const UserCommentName = (props:any) => {
    const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
    //console.log(props.userid);
    const fetchUser = () => {
        ProfileService.fetchProfileSpecific(props.userid)
            .then(userInfo => {
                setUserInformation(userInfo);
                //console.log(userInfo);
            })
    }

    useEffect(() => {
        fetchUser();
    },[])
    return (
        <div className="blog-fl">
            {userInformation.map(userInformation => (
                <a>{userInformation.name}</a>
            ))}
        </div>


    )

}

export default UserCommentName;