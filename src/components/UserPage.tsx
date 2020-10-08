import React, { useState , Component } from 'react';
import Photo from './upload';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import ProfilePic from '../photo/profilepic.png';

import SectionService from '../services/SectionService';

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserPage = () => {

    return (
        <div>
            <Form inline className="main-div">
                <div>
                    <Image className="profile-page-pic" src={ProfilePic} roundedCircle />
                </div>
                <div className="profile-info">
                    <h4>Name : Sawasdee Peemai</h4>
                    <h4>Username : eieizaza</h4>
                    <h4>Profile Description : </h4>
                    <h4>Activity : </h4>
                </div>
            </Form>
        </div>
    );
}

export default UserPage;
