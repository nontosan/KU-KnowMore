// IMPORT LIBRARY //
import React, { useState,useEffect, Suspense  } from 'react'
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

import ImageComponent from './Display';
import AddSection from '../photo/addsection.png';
// IMPORT SERVICE //
import BlogsService from "../services/BlogsService";
import SectionService from "../services/SectionService";
import LoginService from '../services/LoginService';
import CourseService from '../services/CourseService';
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog }from '../interfaces/blog';
import {Section_Edit} from "../interfaces/SectionEdit"
import { Section } from '../interfaces';
import { Course,Course_real } from '../interfaces/course'
import { User_Sch } from '../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import minus from '../photo/minus_PNG39.png';
import GearEdit from '../photo/gear-edit6.png';
import GearEditBlack from '../photo/settings-8-xxl.png';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

const ReadBlogKnowledge = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [isHaveSections, setIsHaveSections] = useState<boolean>(true);
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
  const [courseInformation, setCourseInformation] = useState<Course_real[]>([]);
  const [author, setAuthor] = useState<string>('');
  const history = useHistory()
  //%%%%%%%%%%%%%%%%%%%%%%saatrt copy%%%%%%%%%%
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  const blogId =window.location.pathname.split("/")[2]
  ///////////////////////////////copy/////////////////////////////////////
  const resultLimit = 10
    let i = 0;
    let k = 0;
    let count = 0;
    let check = 0;
    const [allCourse,setAllCourse] = useState<any[]>([]);
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<string>('');
    const [selectNameTh, setSelectNameTh] = useState<string>('');
    const [selectNameEn, setSelectNameEn] = useState<string>('');
    const [selectTeacher, setSelectTeacher] = useState<string>('');
    const [selectCourseId, setSelectCourseId] = useState<string>('');
  ///////////////////////////////end copy//////////////////////////////////
  //fetch blog from database
  
  const fetchCourse =(x:string)=>{
    CourseService.fetchCourse().then(res=>{
        setAllCourse(res);
        res.forEach((value,index)=>{
            //console.log(x)
            if(value.id===x){
              console.log("found")
              setSelectCode(value.Code)
              setSelectNameTh(value.NameTh)
              setSelectNameEn(value.NameEn)
              setSelectTeacher(value.Teacher)
            }
        })
    })
}
  

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  //console.log(props.match.params)
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
        fetchCourse(blogInfo[0].course_id)
        //console.log(blogInfo);
      });
  }

  const fetchsection = () => {
    SectionService.fetchSections(blogId)
      .then(Arraysections => {
        console.log(Arraysections)
        if(Arraysections.length == 0){
          setIsHaveSections(false);
        }
        setSectionsInformation(Arraysections);
      });
  }

  const fetchProfile = () => {
    ProfileService.fetchProfileSpecific(author)
      .then(userInfo => {
        setUserInformation(userInfo);
      })
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
    fetchsection();
  },[])

  useEffect(()=>{
    if(author!=undefined){
      fetchProfile();
    }
  },[author])
  //console.log(userInformation);
  return (
    <div>
      <div className="hot-kl">
        {userInformation.map(item => (
          <Card.Header>
            <div>
              <Link to={`/userpage/${item.id}`} style={{ float : "left" }}>
                <Suspense  fallback={<div>Loading... </div>}>
                  <div className="blog-fl">
                    <ImageComponent userid={item.pic_dir}/>
                  </div>
                </Suspense>
              </Link>
              <Link to={`/userpage/${item.id}`} style={{ color : "white" }}>
                {item.name}
              </Link>
            </div>
          </Card.Header>
        ))}

      </div>
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
        {!isHaveSections &&
          <div>
            NO CONTENT YET
          </div>
        }
        {sectionsInformation.map(item=>{
          count++;
          {
            return(
              <div>
                <Link className="show-all-section" to={`/readSection/${item.id}`}>
                    <strong>Chapter {count} : {item.section_name}</strong> 
                    <div style={{ float: "right" }}>
                      {author==localStorage.userId &&
                        <div style={{ float: "right" }}>
                          <Image className="gear-setting-pic blog-fl" src={GearEditBlack}></Image>
                          <Link to={`/editSection/${item.id}`}>
                            <Button>Edit</Button>
                          </Link>
                          <Image className="delete-setting-pic blog-fl" src={minus}></Image>
                        </div>
                      }
                    </div>
                    {false &&
                      <div>
                        {item.blog_id} {item.id}
                      </div>
                      }
                </Link>
                {false &&
                  <div>
                    <Button variant="outline-danger">DELETE</Button>
                    <Button variant="outline-warning">EDIT</Button>
                  </div>
                }
              </div>
            )
          }
        })}
        {author==localStorage.userId &&
          <Link to={`/writeSection/${blogId}`}>
            <Button variant="outline-secondary" className="button-addsection">
              <Image className="addsection" src={AddSection} roundedCircle />
            </Button>
          </Link>
        }
        
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
