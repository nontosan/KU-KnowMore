import React from 'react';
import Image from 'react-bootstrap/Image';
import ProfilePic from '../Photo/profilepic.png';
import '../style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FetchReport_comment from '../components/FetchReport-comment';

const ProfileAdmin_comment1 = () => {
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
                        <Image className="picture-padding" src={ProfilePic} roundedCircle />
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
            <FetchReport_comment />
            
        </div>
    );
}

export default ProfileAdmin_comment1