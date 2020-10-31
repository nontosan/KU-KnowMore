// IMPORT LIBRARY //
import React, { useEffect , useState , Component, Suspense  } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../../modals/DeleteModal';
import ImageComponent from './Display';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from '../../services/BlogsService';
import ProfileService from '../../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from '../../interfaces/blog';
import { User_Sch } from '../../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import '../../style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const UserCommentAuthor = (props:any) => {
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
                <div className="blog-fl black-font">
                    <Link to={`/userpage/${userInformation.id}`} style={{ float : "left" }} className="blog-fl">
                        <Suspense fallback={<div>Loading... </div>}>
                            <ImageComponent className="profile-pic" userid={userInformation.pic_dir}/>
                        </Suspense>
                    </Link>
                    <Link to={`/userpage/${userInformation.id}`} style={{ color : "black" }} className="blog-fl">
                        <strong className="blog-fl">{userInformation.name}</strong>
                    </Link>
                </div>
            ))}
        </div>


    )

}

export default UserCommentAuthor;