import React, { useState , Component, useEffect } from 'react';
import Photo from './upload';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import { User_Sch } from '../interfaces/user';


import {
    Link, Redirect,
  } from 'react-router-dom';

  
import ProfilePic from '../photo/profilepic.png';

// IMPORT SERVICE //
import SectionService from '../services/SectionService';
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const UserPage = (props:any) => {
    const [userInformation, setUserInformation] = useState<User_Sch[]>([]);

    const userId = props.match.params.userId

    const fetchProfile = () => {
        ProfileService.fetchProfileSpecific(userId)
            .then(userInfo => {
                setUserInformation(userInfo);
                console.log(userInfo);
            })
    }

    useEffect(() => {
        fetchProfile();
    },[])

    return (
        <div>
            <Form inline className="main-div">
                <div>
                    <Image className="profile-page-pic" src={ProfilePic} roundedCircle />
                </div>
                {userInformation.map(userInformation => (
                    <div className="profile-info">
                        <h4>Name : {userInformation.name}</h4>
                        <h4>Username : {userInformation.username}</h4>
                        <h4>Profile Description : {userInformation.profile_description} </h4>
                        <h4>Activity : </h4>
                    </div>
                ))} 
            </Form>
            <Link to="/editProfile">
                <Button variant="outline-danger">EDIT</Button>
            </Link>
        </div>
    );
}

export default UserPage;
