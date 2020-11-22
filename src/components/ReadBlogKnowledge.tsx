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

import DeleteModal from '../modals/DeleteModal';
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
import './readknowledge.css';
import './file.css';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import minus from '../photo/minus_PNG39.png';
import GearEdit from '../photo/gear-edit6.png';
import GearEditBlack from '../photo/settings-8-xxl.png';
// END OF IMPORT PHOTO //
import ChangeBlogInfoModal from "../modals/ChangBlogInfo"
import LikeService from '../services/LikeService';
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

  //CONST FOR DELETE MODAL//
  
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [BlogDelete, setBlogDelete] = useState<Blog>();
  const [statusDelete, setStatusDelete] = useState<boolean>(false);
  //END OF CONST FOR DELETE MODAL//
  
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
  
  const deletesection=()=>{
    console.log("deletesection")
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

  const handleDeleteBlog = (blog:Blog) => {
    console.log('handle delete blog')
    setShowDeleteModal(true);
    setBlogDelete(blog);
  }
    
  const submitDeleteBlog = () => {
    setShowDeleteModal(false);
    BlogsService.deleteBlog(BlogDelete?.id!)
        .then(res => {
            if (res) {
                setStatusDelete(true);
            }
        })
}

const closeModal = () => {
  setShowDeleteModal(false);
}

  const increast_view = () => {
    LikeService.fetchView(blogId);
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
    fetchsection();
    increast_view();
  },[])

  useEffect(()=>{
    if(author!==''){
      console.log(author);
      fetchProfile();
    }
  },[author])

  useEffect(() => {
    if (statusDelete==true) {
      window.location.replace(`/userpage/${author}`);
      setStatusDelete(false);
    }
  },[statusDelete]);
  //console.log(userInformation);
  return (
    <div>
      {false &&
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
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/userpage/${item.id}`} style={{ color : "white" }}>
                  {item.name}
                </Link>
              </div>
            </Card.Header>
          ))}
        </div>
      }
      <div className="hot-kl-noborder-top">
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
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={`/userpage/${item.id}`} style={{ color : "white" }}>
                {item.name}
              </Link>
            </div>
          </Card.Header>
        ))}
        {blogsInformation.map(blogInformation=>(
          <Card.Header className="hot-kl-no-margin">
            <div>
              <strong>Blog Name</strong> : {blogInformation.blog_name}
              <div style={{ float: "right" }}>
                {author==localStorage.userId &&
                  <div>
                    <ChangeBlogInfoModal/>
                    <button className="blog-delete-button" onClick={() => handleDeleteBlog(blogInformation)}>
                      <Image className="delete-setting-pic blog-fl" src={minus} ></Image>
                    </button>
                    {showDeleteModal && 
                      <div>
                        <DeleteModal 
                          show = {showDeleteModal}
                          nameBlog = {BlogDelete?.blog_name}
                          deleteBlog = {submitDeleteBlog}
                          cancel = {closeModal}
                        />
                      </div>
                    }
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

      <div className="hot-kl-noborder-top">
        <Card.Header>SECTION</Card.Header>
  
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
                          {false &&
                          <Link to={`/editSection/${item.id}`}>
                            <Button>Edit</Button>
                          </Link>}
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
      <div className="knowledge_button">
        <Button variant="secondary" onClick={e=>{history.goBack()}}>back</Button>
      </div>
    </div>
  );
};

export default ReadBlogKnowledge