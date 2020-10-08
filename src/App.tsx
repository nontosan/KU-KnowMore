import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import ProfilePic from './photo/profilepic.png';
import SearchPic from './photo/Magnify.png';
import BluePlus from './photo/BluePlus.png';
import RedPlus from './photo/RedPlus.png';

import Filtermodel from './modals/filter'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import WriteSection from "./components/WriteSection";
import CreateEditSection from "./components/createeditsection";
import UserPage from "./components/UserPage";
import KnowledgeBlog from './components/KnowledgeBlog';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">KU KNOWMORE</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/searchknowledgeblog">KNOWLEDGE BLOG</Nav.Link>
                    <Nav.Link href="#pricing">REVIEW BLOG</Nav.Link>
                    </Nav>
                    <Form inline >
                        <Link to="/">
                            <Image className="search-pic" src={SearchPic}></Image>
                        </Link>
                        <NavDropdown title="Create Your Blog" id="collasible-nav-dropdown" >
                            <NavDropdown.Item href="/knowledgeblog">Create Knowledge</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Create Review</NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/userpage">
                            <Image className="profile-pic" src={ProfilePic} roundedCircle />
                        </Link>
                    </Form>
                </Navbar>
                <Switch>
                    <Route path="/knowledgeblog">
                        <CreateEditSection />
                    </Route>
                    <Route path="/writesection">
                        <WriteSection />
                    </Route>
                    <Route path="/userpage">
                        <UserPage />
                    </Route>
                    <Route path="/searchknowledgeblog">
                        <KnowledgeBlog />
                    </Route>
                    <Route path="/">
                        <div className="main-div-main">
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="search-bar"/>
                            <Filtermodel />
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;