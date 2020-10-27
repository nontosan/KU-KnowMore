// IMPORT LIBRARY //
import React, { useState,useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Comment_component from "./comment";
import LikeViewReport from "../gadget/LikeViewReport";
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {useHistory} from "react-router"

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService";
import SectionService from "../services/SectionService";
import LoginService from '../services/LoginService';
import CourseService from '../services/CourseService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog }from '../interfaces/blog';
import { Section } from '../interfaces';
import { Course,Course_real } from '../interfaces/course'
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import minus from '../photo/minus_PNG39.png';
import GearEdit from '../photo/gear-edit6.png';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

const ReadBlogKnowledge = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  const [courseInformation, setCourseInformation] = useState<Course_real[]>([]);
  const [author, setAuthor] = useState<string>('');
  const history = useHistory()
  //console.log(props.match.params)
  const blogId = props.match.params.blogId
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(blogInfo => {
        CourseService.fetchCourseWithId(blogInfo[0].course_id)
          .then(courseInfo => {
            setCourseInformation(courseInfo);
            console.log(courseInfo);
          })
        setBlogsInformation(blogInfo);
        setAuthor(blogInfo[0].user_id);
        //console.log(blogInfo);
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
        {blogsInformation.map(blogInformation=>(
          <Card.Header>
            <div>
              <strong>Blog Name</strong> : {blogInformation.blog_name}
              <div style={{ float: "right" }}>
                {author==localStorage.userId &&
                  <div>
                    <Image className="gear-setting-pic blog-fl" src={GearEdit}></Image>
                    <Image className="delete-setting-pic blog-fl" src={minus}></Image>
                  </div>
                }
              </div>
            </div>
            {courseInformation.map(item=>(
              <div>
                <div>
                  <strong>Code</strong> : {item.Code}
                </div>
                <div>
                  <strong>Subject</strong> : {item.NameEn}
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {item.NameTh}
                </div>
                <div>
                  <strong>Teacher</strong> : {item.Teacher}
                </div>
              </div>
            ))}
          </Card.Header>
        ))}
        
      </div>
      <div className="hot-kl">
        <Card.Header>SECTION</Card.Header>
        {sectionsInformation.map(item=>(
          <div>
            <Link className="show-blog" to={`/readSection/${item.id}`}>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>{item.section_name}</strong> {item.blog_id} {item.id}</ListGroup.Item>
              </ListGroup>
            </Link>
            <Button variant="outline-danger">DELETE</Button>
            <Button variant="outline-warning">EDIT</Button>
          </div>
        ))}
      </div>
      <LikeViewReport x={blogsInformation}/>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
        <Comment_component 
          blogId = {blogId}
        />
      </div>
      <button onClick={e=>{history.goBack()}}>back</button>
    </div>
  );
};

export default ReadBlogKnowledge
