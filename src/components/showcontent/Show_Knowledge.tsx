// IMPORT LIBRARY //
import React, { useState,useEffect, Suspense  } from 'react'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Comment_component from "./comment";
import LikeViewReport from "../../gadget/LikeViewReport"
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {useHistory} from "react-router"

import ImageComponent from './Display';
import AddSection from '../../Photo/addsection.png';
// IMPORT SERVICE //
import BlogsService from "../../services/BlogsService";
import SectionService from "../../services/SectionService";
import LoginService from '../../services/LoginService';
import CourseService from '../../services/CourseService';
import ProfileService from '../../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog }from '../../interfaces/blog';
import {Section_Edit} from "../../interfaces/section_edit"
import { Section } from '../../interfaces/Section';
import { Course,Course_real } from '../../interfaces/course'
import { User_Sch } from '../../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import '../../style/section.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../../Photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../Photo/alert.png';
import minus from '../../Photo/minus_PNG39.png';
import GearEdit from '../photo/gear-edit6.png';
import ChangeBlogInfoModal from '../../modals/ChangBlogInfo';
import DeleteModal from '../../modals/DeleteModal';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

const Show_Knowledge = (props:any) => {
    const [sectionsInformation, setSectionsInformations] = useState<any[]>([]);
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
          setSectionsInformations(Arraysections);
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
  
    //refreh
    useEffect(()=>{
      fetchBlogs();
      fetchsection();
    },[])
  
    useEffect(()=>{
      if(author!==''){
        console.log(author);
        fetchProfile();
      }
    },[author])
  
    useEffect(() => {
      if (statusDelete==true) {
        window.location.replace('/');
        setStatusDelete(false);
      }
    },[statusDelete]);
    //console.log(userInformation);
  return (

    <div>
      
      <div>
        {blogsInformation.map(blogInformation=>(
          <div>
            {courseInformation.map(item=>(
              <div>
                  <strong>รหัสวิชา</strong> : {item.Code}
                  <strong>วิชา</strong> : {item.NameEn} ({item.NameTh})                         
                  <strong>อาจารย์</strong> : {item.Teacher}
              </div>
            ))}
          </div>
        ))}
      </div>

      <br/>
      
      <div>
        <Card>
        <Card.Header>SECTION</Card.Header>
        {!isHaveSections &&
          <div className="show-nochapter">
            <strong>No Chapter Yet</strong> 
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
        </Card>
      </div>

      <br/>

      <div>
        <Card bg="light">
          <Card.Header>COMMENTS</Card.Header>
          <Card.Body><Comment_component blogId = {blogId}/></Card.Body>
        </Card>
      </div>
      
      <div className="block">
        <LikeViewReport x={blogsInformation}/>
        {userInformation.map(item => (
          <div className="block">
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
        ))}
      </div>

    </div>
  );
};
  
export default Show_Knowledge