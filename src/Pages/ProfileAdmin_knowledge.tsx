import React from 'react';
import Image from 'react-bootstrap/Image';
import ProfilePic from '../Photo/profilepic.png';
import '../style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FetchReport_knowledge from '../components/FetchReport-knowledge';

const ProfileAdmin_knowledge = () => {
    return (
        <div>
            <Navbar className="navbar navbar-light bgNavbar"> 
                <Navbar.Brand href="/">
                    <div className="size-KU-knowmore">
                        KU-Knowmore
                    </div>
                    
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <div>
                        <Image className="profile-page-pic picture-padding" src={ProfilePic} roundedCircle />
                    </div>
                    <Navbar.Text className="size-sign">
                        Signed in as: <a href="#login">Username</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <ListGroup.Item>
                <p> Report : </p>
                <Link to= {`/review`}>
                    <Button>Review</Button>
                </Link>
                <Link to= {`/knowledge`}>
                    <Button>Knowledge</Button>
                </Link>
                <Link to= {`/comment`}>
                    <Button>Comment</Button>
                </Link>
            </ListGroup.Item>
            <FetchReport_knowledge />
            
        </div>
    );
}

export default ProfileAdmin_knowledge