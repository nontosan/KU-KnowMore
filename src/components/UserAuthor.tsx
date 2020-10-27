// IMPORT LIBRARY //
import React, { useEffect , useState , Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../modals/DeleteModal';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from '../services/BlogsService';
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from '../interfaces/blog';
import { User_Sch } from '../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const UserAuthor = (props:any) => {
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
        <div className="author-user">
            {userInformation.map(userInformation => (
                <div className="blog-fr black-font">
                    Author : {userInformation.name} 
                </div>
            ))}
        </div>


    )

}

export default UserAuthor;