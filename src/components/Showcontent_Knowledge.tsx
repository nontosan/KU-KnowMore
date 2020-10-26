import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import { Section_Edit } from '../interfaces/section_edit';
import  loadeditsection from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Blog }from '../interfaces/blog'
import AddSection from '../photo/addsection.png';
import Card from 'react-bootstrap/Card';
import BlogsService from "../services/BlogsService"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Knowledgecontent = () =>{

}

export default Knowledgecontent