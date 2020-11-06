import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import ProfilePic from '../Photo/profilepic.png';
import '../style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import LoginService from '../services/LoginService';
import { User_Sch } from '../interfaces/user';
import LoginPage from './LoginPage';
import Portal from './Portal';
import { Link, Route, Router, Switch } from 'react-router-dom';
import home from '../Photo/homeicon.png'

const NavBar = () => {
    
    const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
    const [username, setUsername] = useState<string|null>(null);
    const [userId, setUserId] = useState<string|null>(null);
    const [log, setLog] = useState<boolean>(true);
    useEffect(() => {
        setUsername(LoginService.getUsername());
        setUserId(LoginService.getUserId());
        
        if (localStorage.accessToken !== undefined){
            setLog(false);
        }
    },[])
    console.log(userInformation)

    //console.log(username);
    const logout = () => {
        LoginService.UserLogout();
        setUsername(null);
        setUsername(null);
        setLog(true);
        alert('ออกจากระบบแล้ว')
    };
    return (
        <div>
            <Navbar className="navbar navbar-light bgNavbar">
                <Navbar.Brand href="/">
                    <div className="size-KU-knowmore">
                        <Image className="profile-page-pic picture-padding" src={home} roundedCircle />
                        KU-Knowmore
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <div>
                        <Image className="profile-page-pic picture-padding" src={ProfilePic} roundedCircle />
                    </div>
                    <Navbar.Text className="size-sign">
                        Signed in as: <a href="#">aaaaaaaa</a>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Nav>
                    {log && (
                        <Form inline>
                            <Nav.Link href="/login" className="login-button">LOGIN</Nav.Link>
                        </Form>
                    )}
                    {!log && (
                        <Link to= {`/login`}>
                        <Form inline>
                                &nbsp;&nbsp;&nbsp;<button onClick={logout} className="logout-button">LOGOUT</button>
                        </Form>
                        </Link>
                    )}
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar