import React from 'react';
import Image from 'react-bootstrap/Image';
import ProfilePic from '../Photo/profilepic.png';
import '../style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

const Nav = () => {
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
        </div>
    )
}

export default Nav