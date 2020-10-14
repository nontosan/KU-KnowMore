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
} from 'react-router-dom';


import ProfileAdmin from "./components/ProfileAdmin";


import './App.css';
import './components/section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchreport } from './Fetch/FetchReport';

const App = () =>
{
  return(
  <div> 
    
    <ProfileAdmin />
    
  </div>
  )
}

export default App;