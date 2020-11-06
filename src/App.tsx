import React, { useState } from 'react';
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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} 
from 'react-router-dom';
import ProfileAdmin from "./Pages/ProfileAdmin";
import './App.css';
import './style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import ReadBlog_Admin from './Pages/ReadBlog_Admin';
import readSection from './Pages/readSection'
import Portal from './components/Portal';
import LoginService from './services/LoginService';
import { User_Sch } from './interfaces/user';
import LoginPage from './components/LoginPage';

const App = () =>
{
  const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
  const [username, setUsername] = useState<string|null>(null);
  const [userId, setUserId] = useState<string|null>(null);
  const [log, setLog] = useState<boolean>(true);
  const handleUserLogin = () => {
    setUsername(LoginService.getUsername());
    setUserId(LoginService.getUserId());
    setLog(false);
    alert('ยินดีต้อนรับสู่ KU-KNOWMORE')
}
  return (
    <div>  
      <Router>
      
      <Switch>
        <Route exact path="/">
          
          <ProfileAdmin/>
        </Route>

        <Route path="/read:type/:blogId" name="blogId" component={ReadBlog_Admin} />
        <Route path="/Section/:sectionId" name="sectionId" component={readSection} />
  
        <Route path="/portal" name="code">
          <Portal loginCallback={handleUserLogin}/>
        </Route>
        
        <Route path="/login">
          <LoginPage loginCallback={handleUserLogin}/>
        </Route>
      </Switch>
    </Router>
  </div>
  )
}

export default App;