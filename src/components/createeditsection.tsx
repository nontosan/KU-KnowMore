import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import { Section_Edit } from '../interfaces/SectionEdit';
import  loadeditsection from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Blog }from '../interfaces/blog'
import AddSection from '../photo/addsection.png';
import BlogsService from "../services/BlogsService"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}
const CreateEditSection = (props:blogidformpagebefore) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blog,setBlogs] = useState<Blog>()
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(props.blog_id)
    .then(blog => {
    setBlogs(blog);
    });
  }

  //function fetch section form database
  const fetchsection=()=>{

  }

  //delete section  
  const handledeletesection=()=>{
    fetch("api_path for delete section",{
      method:"Post",
      headers:{'Content-Type':'appllication/json'},
      body:JSON.stringify(sections)
    }).then(res=>res.json())
  }


  //edit section => create route with section data from backend
  const handleeditsection=()=>{
    console.log("create route to create section")
  }

  //refreh
  useEffect(()=>{
    console.log("refresh")
  },[])
  return (
    <div>

      <div>
        {sections.map(item=>(
          <div>
            <div>{sections}</div>
            <button onClick={handledeletesection}>edit</button>
            <button onClick={handleeditsection}>delete</button> 
          </div>
        ))}
      </div>
      <div className="div-addsection">
        <Link to="/writesection">
          <Button variant="outline-secondary" className="add button-addsection">
            <Image className="addsection" src={AddSection} roundedCircle />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateEditSection
