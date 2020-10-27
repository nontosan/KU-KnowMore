import React, { useEffect , useState, Suspense } from 'react';
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
import Showrwinmain from "./components/ShowReviewInMain";
import CreateKlBlog from "./components/CreateBlogTypeKnowLedge";
import CreateRwBlog from "./components/CreateBlogTypeReview";
import SearchFilter from "./components/SearchFilter";
import ReadBlogKnowledge from './components/ReadBlogKnowledge';
import ReadBlogReview from './components/ReadBlogReview';
import ReadSection from './components/Section/ReadSection';
import EditSection from './components/Section/EditSection';
import LoginPage from './components/LoginPage';
import ImageComponent from './components/Display';


import LoginService from './services/LoginService';
import ProfileService from './services/ProfileService';

import Dropdowntest from './gadget/create_blog';


import { User_Sch } from './interfaces/user';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import WriteSection from "./components/Section/WriteSection";
import CreateEditSection from "./components/createeditsection";
import CreateEditReview from "./components/CreateEditReview"
import UserPage from "./components/UserPage";
import KnowledgeBlog from './components/KnowledgeBlog';
import ReviewBlog from './components/ReviewBlog';
import EditProfile from './components/EditProfile';

import './App.css';
import './components/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import CreateBlogReview from './components/Review_component/CreateReviewContent';

const App = () => {
    const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
    const [username, setUsername] = useState<string|null>(null);
    const [userId, setUserId] = useState<string|null>(null);
    const [log, setLog] = useState<boolean>(true);
    useEffect(() => {
        setUsername(LoginService.getUsername());
        setUserId(LoginService.getUserId());
        //console.log("HELLOMAIN");
        //console.log(localStorage.accessToken);
        if (localStorage.accessToken !== undefined){
            //console.log("HELLOLOG");
            setLog(false);
        }
    },[])

    const handleUserLogin = () => {
        setUsername(LoginService.getUsername());
        setUserId(LoginService.getUserId());
        setLog(false);
        alert('ยินดีต้อนรับสู่ KU-KNOWMORE')
    }

    //console.log(username);
    const logout = () => {
        LoginService.UserLogout();
        setUsername(null);
        setUsername(null);
        setLog(true);
        alert('ออกจากระบบแล้ว')
    };
    //console.log(localStorage.accessToken)

    const fetchProfile = () => {
        if(userId !== null){
            ProfileService.fetchProfileSpecific(userId)
                .then(userInfo => {
                    setUserInformation(userInfo);
                    console.log(userInfo);
                })
        }
    }
    //console.log(userId);
    useEffect(() => {
        if(userId !== null) {
            fetchProfile();
        }
    },[userId])

    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">KU KNOWMORE</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/searchknowledgeblog">KNOWLEDGE BLOG</Nav.Link>
                        <Nav.Link href="/searchreviewblog">REVIEW BLOG</Nav.Link>
                        <Nav.Link href="/dropdowntest">dropdowntest</Nav.Link>
                    </Nav>
                    <Form inline >
                        <Link to="/">
                            <Image className="search-pic" src={SearchPic}></Image>
                        </Link>
                        <NavDropdown title="Create Your Blog" id="collasible-nav-dropdown" >
                            <NavDropdown.Item href="/createklblog">Create Knowledge</NavDropdown.Item>
                            <NavDropdown.Item href="/createrwblog">Create Review</NavDropdown.Item>
                        </NavDropdown>
                        <Link to={`/userpage/${userId}`}>
                            <Suspense fallback={<div>Loading... </div>}>
                                {userInformation.map(a=>
                                <ImageComponent className="profile-pic" userid={a.pic_dir}/>)}
                            </Suspense>
                        </Link>
                    </Form>
                    { username && (
                        <div className="white-font">
                            <Nav className="mr-auto">
                                <Nav.Link href={`/userpage/${userId}`}>
                                    &nbsp;&nbsp;&nbsp;
                                    {username}
                                </Nav.Link>
                            </Nav>
                        </div>
                    )}
                    <Nav>
                        {log && (
                            <div>
                                <Nav.Link href="/login">LOGIN</Nav.Link>
                            </div>
                        )}
                        {!log && (
                            <div>
                                &nbsp;&nbsp;&nbsp;<Button onClick={logout}>LOGOUT</Button>
                            </div>
                        )}
                    </Nav>
                </Navbar>
                <Switch>
                    <Route path="/myKnowledge/:blogId" name="blogId" component={CreateEditSection}></Route>
                    <Route path="/myReview/:blogId" name="blogId" component={CreateEditReview}></Route>
                    <Route path="/readKnowledge/:blogId" name="blogId" component={ReadBlogKnowledge}></Route>
                    <Route path="/readReview/:blogId" name="blogId" component={ReadBlogReview}></Route>
                    <Route path="/editReview/:blogId" name="blogId" component={CreateRwBlog}></Route>
                    <Route path="/writeSection/:blogId" name="blogId" component={WriteSection}></Route>
                    <Route path="/readSection/:sectionId" name="sectionId" component={ReadSection}></Route>
                    <Route path="/editSection/:sectionId" name="sectionId" component={EditSection}></Route>
                    <Route path="/userpage/:userId" name="userId" component={UserPage}></Route>
                    <Route path="/editProfile/:userId" name="userId" component={EditProfile}></Route>
                    <Route path="/dropdowntest">
                        <Dropdowntest />
                    </Route>
                    <Route path="/login">
                        <LoginPage loginCallback={handleUserLogin}/>
                    </Route>
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
                            <ListGroup variant="flush">
                                <Showklinmain />
                            </ListGroup>
                        </div>
                        <div className="hot-kl" style={{ marginBottom : "50px" }}>
                            <Card.Header>REVIEW BLOG</Card.Header>
                            <ListGroup variant="flush">
                                <Showrwinmain />
                            </ListGroup>
                        </div>
                    </Route>
                </Switch>
                <div>
                    <br /><br />
                    <div className="three-column-footer-contact-form-container">
                        <footer className="three-column-footer-contact-form" data-equalizer data-equalize-by-row="true">
                            <div className="footer-left" data-equalizer-watch>
                                <div className="baseline">
                                    <div className="contact-details">
                                        <h6>Contact details</h6>
                                        <p><i className="fa fa-phone fa-lg" aria-hidden="true"></i> 01234 567890</p>
                                        <p><a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i> Contact us</a></p>
                                        <p><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i> Street, City, County, Country</p>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-right" data-equalizer-watch>
                                <div className="baseline">
                                    <div className="social">
                                        <i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
                                        <i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                                        <i className="fa fa-google-plus-square fa-2x" aria-hidden="true"></i>
                                        <i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-right" data-equalizer-watch>
                                <h6>Opening times</h6>
                                <p>Mon - Fri 9:00am - 5:00pm</p>
                                <p>Sat 9:00am - 8:00pm</p>
                                <p>Sun 9:00am - 4:00pm</p>
                                <div className="baseline">
                                    <img className="thumbnail footer-img" src="https://i.pinimg.com/474x/e4/fe/d9/e4fed988ab8592a40598812d8daedab2.jpg"/>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;