import React, { useState , Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';
import ProfilePic from '../Photo/profilepic.png';
import '../style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchReport from '../components/FetchReport';

const ProfileAdmin = () => {
    return (
        <div>
            <Form inline className="main-div">
                <div>
                    <Image className="profile-page-pic" src={ProfilePic} roundedCircle />
                </div>
                <div className="profile-info">
                    <h4>Username : eieizaza</h4>
                </div>
            </Form>
            
            <FetchReport/>
            
            
            
            
        </div>
    );
}

export default ProfileAdmin;