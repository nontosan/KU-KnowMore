import React, { useState,useEffect, useImperativeHandle } from 'react'
import  loadeditsection, { fetchsection } from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Blog }from '../interfaces/blog';
import { Section } from '../interfaces';
import AddSection from '../photo/addsection.png';
import Card from 'react-bootstrap/Card';

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService";
import SectionService from "../services/SectionService";
// END OF IMPORT SERVICE //

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';

import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReadBlogKnowledge = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  
  console.log(props.match.params)
  const blogId = props.match.params.blogId
  
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(blogInfo => {
        setBlogsInformation(blogInfo);
        console.log(blogInfo);
      });
  }

  const fetchsection = () => {
    SectionService.fetchSections(blogId)
      .then(Arraysections => {
        setSectionsInformation(Arraysections);
      });
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
    fetchsection();
  },[])

  return (
    <div>
      <div className="hot-kl">
        <Card.Header>KNOWLEDGE ISUS</Card.Header>
      </div>
      <div className="hot-kl">
        {blogsInformation.map(blogInformation=>(
          <Card.Header>
            Blog Name : {blogInformation.blog_name} <br />
            Course ID : {blogInformation.course_id}
          </Card.Header>
        ))}
      </div>
      <div className="hot-kl">
        {sectionsInformation.map(item=>(
          <div>
            <Link to={`/readSection/${item.id}`}>
              <button><strong>{item.section_name}</strong> {item.blog_id} {item.id}</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="hot-kl">
        <Card.Header>
          <Image className="likebar-pic" src={Like} /> 100
          <Image className="likebar-pic" src={Viewer} />50
          <Image className="likebar-pic" src={Alert} />
        </Card.Header>
      </div>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
      </div>
    </div>
  );
};

export default ReadBlogKnowledge
