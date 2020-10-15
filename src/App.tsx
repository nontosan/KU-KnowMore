import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import ProfilePic from './photo/profilepic.png';
import SearchPic from './photo/Magnify.png';

import Filtermodel from './modals/filter';

import Showklinmain from "./components/ShowKnowledgeInMain";
import CreateKlBlog from "./components/CreateBlogTypeKnowLedge";
import CreateRwBlog from "./components/CreateBlogTypeReview";
import SearchFilter from "./components/SearchFilter";
import ReadBlogKnowledge from './components/ReadBlogKnowledge';
import ReadBlogReview from './components/ReadBlogReview';
import ReadSection from './components/Section/ReadSection';
import EditSection from './components/Section/EditSection';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import WriteSection from "./components/Section/WriteSection";
import CreateEditSection from "./components/CreateEditSection";
import UserPage from "./components/UserPage";
import KnowledgeBlog from './components/KnowledgeBlog';
import ReviewBlog from './components/ReviewBlog';

import './App.css';
import './components/section.css';
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
                    <Nav.Link href="/searchreviewblog">REVIEW BLOG</Nav.Link>
                    </Nav>
                    <Form inline >
                        <Link to="/">
                            <Image className="search-pic" src={SearchPic}></Image>
                        </Link>
                        <NavDropdown title="Create Your Blog" id="collasible-nav-dropdown" >
                            <NavDropdown.Item href="/createklblog">Create Knowledge</NavDropdown.Item>
                            <NavDropdown.Item href="/createrwblog">Create Review</NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/userpage/5f82fd5504eb8600aa617b6b">
                            <Image className="profile-pic" src={ProfilePic} roundedCircle />
                        </Link>
                    </Form>
                </Navbar>
                <Switch>
                    <Route path="/myKnowledge/:blogId" name="blogId" component={CreateEditSection}></Route>
                    <Route path="/readKnowledge/:blogId" name="blogId" component={ReadBlogKnowledge}></Route>
                    <Route path="/readReview/:blogId" name="blogId" component={ReadBlogReview}></Route>
                    <Route path="/writeSection/:blogId" name="blogId" component={WriteSection}></Route>
                    <Route path="/readSection/:sectionId" name="sectionId" component={ReadSection}></Route>
                    <Route path="/editSection/:sectionId" name="sectionId" component={EditSection}></Route>
                    <Route path="/userpage/:userId" name="userId" component={UserPage}></Route>
                    <Route path="/searchknowledgeblog">
                        <KnowledgeBlog />
                    </Route>
                    <Route path="/searchreviewblog">
                        <ReviewBlog />
                    </Route>
                    <Route path="/createklblog">
                        <CreateKlBlog />
                    </Route>
                    <Route path="/createrwblog">
                        <CreateRwBlog/>
                    </Route>
                    <Route path="/filter/:search" name="search">
                        <SearchFilter />
                    </Route>
                    <Route path="/">
                        <div className="main-div-main">
                            <Filtermodel />
                        </div>
                        <div className="hot-kl">
                            <Card.Header>KNOWLEDGE BLOG</Card.Header>
                            <ListGroup variant="flush" className="show-blog">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className="hot-kl">
                            <Card.Header>REVIEW BLOG</Card.Header>
                            <ListGroup variant="flush" className="show-blog">
                                <Showklinmain />
                            </ListGroup>
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;