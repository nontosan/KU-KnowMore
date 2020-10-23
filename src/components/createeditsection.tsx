import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import { Section_Edit } from '../interfaces/SectionEdit';
import  loadeditsection from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Section } from '../interfaces';
import ListGroup from 'react-bootstrap/ListGroup';
import { Blog }from '../interfaces/blog'
import AddSection from '../photo/addsection.png';
import {useHistory} from "react-router"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import BlogsService from "../services/BlogsService"
import SectionService from "../services/SectionService";

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBlogContent from '../gadget/editblogcontent';

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}
const CreateEditSection = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  const blogId = props.match.params.blogId
  const history = useHistory()

  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(blogInfo => {
        setBlogsInfomation(blogInfo);
        console.log(blogInfo);
      });
  }

  const fetchsection = () => {
    SectionService.fetchSections(blogId)
      .then(Arraysections => {
        setSectionsInformation(Arraysections);
      });
  }

  //delete section  
  const handledeletesection=(sectionId:any)=>{
    SectionService.deleteSection(sectionId).then()
  }


  //edit section => create route with section data from backend
  const handleeditsection=()=>{
    console.log("create route to create section")
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
    fetchsection();
  },[])

  return (
    <div>
      <div className="hot-kl">
        {blogsInfomation.map(blogInfomation=>(
        <div>
          <h3>Blog Name : {blogInfomation.blog_name}</h3>
          <h3>Course ID : {blogInfomation.course_id}</h3>
        </div>
        ))}
      </div>

      <div className="hot-kl">
        {sectionsInformation.map(item=>(
          <div>
            <ListGroup variant="flush" className="show-blog">
              <Link to={`/readSection/${item.id}`}>
                <ListGroup.Item><strong>{item.section_name}</strong> {item.blog_id} {item.id}</ListGroup.Item>
              </Link>
              <Button className="cancel-button" variant="outline-secondary">Edit</Button>
              <Button className="submit-button" variant="outline-secondary" onClick={e=>handledeletesection(item.id)}>Delete</Button>
            </ListGroup>
          </div>
        ))}
      </div>
      
      <div className="div-addsection">
        <Link to={`/writeSection/${blogId}`}>
          <Button variant="outline-secondary" className="button-addsection">
            <Image className="addsection" src={AddSection} roundedCircle />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateEditSection
