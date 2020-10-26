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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} 
from 'react-router-dom';
import './App.css';
import './style/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './routes/index';

const App = () =>
{
  
  return(
  <div>  
    <Routing/>
  </div>
  
  )
}

export default App;