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
import LoginService from '../services/LoginService';
import CourseService from '../services/CourseService';
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog , Review}from '../interfaces/blog';
import { Course,Course_real } from '../interfaces/course'
import { User_Sch } from '../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //

import '../App.css';
import './readblogreview.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './readknowledge.css';
import { Progress } from 'antd';
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
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
  const [courseInformation, setCourseInformation] = useState<Course_real[]>([]);
  const [isReview, setIsReview] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>('');
  const history = useHistory()
  //%%%%%%%%%%%%%%%%%%%%%%saatrt copy%%%%%%%%%%
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


  //////////////////////
  const [editorValue, setEditorValue] = useState("");
  const [teachScore, setTeachScore] = useState(0);
  const [workScore, setWorkScore] = useState(0);
  const [roomScore, setRoomScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0)
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
      fetchReview()
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

const fetchReview = () => {
  BlogsService.fetchReviewOfBlog(blogId)
      .then(reviewArray => {
        let review_info = reviewArray[0];
        if(review_info){
          setTeachScore(review_info.teaching);
          setWorkScore(review_info.hw);
          setRoomScore(review_info.classroom);
          setOverallScore(review_info.overall);
          setEditorValue(review_info.content);
          setIsReview(true);
        }else{
          setIsReview(false);
        }
  })  // Done
};

  const increast_view = () => {
    LikeService.fetchView(blogId);
  };

  //refreh
  useEffect(()=>{
    increast_view();
    fetchBlogs();
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
          <Card.Header>
            <div>
              <strong>Blog Name</strong> : {blogInformation.blog_name}
              <div style={{ float: "right" }}>
                {author==localStorage.userId &&
                  <div>
                    {!isReview ?
                      <Link to={`/myReview/${blogId}`}>
                        <button className="blog-delete-button" >
                          <Image className="delete-setting-pic blog-fl" src={GearEdit} ></Image>
                        </button>
                      </Link>
                    :
                      <Link to={`/editReview/${blogId}`}>
                        <button className="blog-delete-button" >
                          <Image className="delete-setting-pic blog-fl" src={GearEdit} ></Image>
                        </button>
                      </Link>
                    }
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
        <Card.Header>Information</Card.Header>
        {!isReview ?
          <div className="show-all-section">NO CONTENT YET</div>
        :
        <div className="Review_Blog">
        <div className="helloworld">
          <div className="div-scrollbar editor_text " >
            <div dangerouslySetInnerHTML={{ __html: editorValue }} />
          </div>
        </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">สอนได้เข้าใจ</label>
                        </Col>
                        <Col>
                            <Progress percent={teachScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({teachScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">จำนวนงาน</label>
                        </Col>
                        <Col>
                            <Progress percent={workScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({workScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">ความสำคัญในการเข้าเรียน</label>
                        </Col>
                        <Col >
                            <Progress percent={roomScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({roomScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">ภาพรวม</label>
                        </Col>
                        <Col>
                            <Progress percent={overallScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({overallScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            </div>
        }
      </div>
      <LikeViewReport x={blogsInformation}/>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
        <Comment_component 
          blogId = {blogId}
        />
      </div>
      <div className="review_button">
        <Button variant="secondary" onClick={e=>{history.goBack()}}>BACK</Button>
      </div>
    </div>
  );
};

export default ReadBlogKnowledge





/*
// IMPORT LIBRARY //
import React, { useState,useEffect, useImperativeHandle } from 'react'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService"
import CourseService from "../services/CourseService"
import Comment_component from "./comment"
import LikeViewReport from "../gadget/LikeViewReport"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {useHistory} from "react-router"

// IMPORT INTERFACE //
import { Section_Edit } from '../interfaces/SectionEdit';
import { Blog }from '../interfaces/blog'
import {Course_real} from "../interfaces/course"
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Progress } from 'antd';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}

function htmlToElement(html : any) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

const ReadBlogReview = (props:any) => {
    const [sections,setsections] = useState<Section_Edit[]>([])
    const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
    const [author, setAuthor] = useState<string>('');
    const history=useHistory()
    const blogId =window.location.pathname.split("/")[2]
    ///////////////////////////////copy/////////////////////////////////////
    const resultLimit = 10
    let i = 0;
    let k = 0;
    let check = 0;
    const [allCourse,setAllCourse] = useState<any[]>([]);
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<string>('');
    const [selectNameTh, setSelectNameTh] = useState<string>('');
    const [selectNameEn, setSelectNameEn] = useState<string>('');
    const [selectTeacher, setSelectTeacher] = useState<string>('');
    const [selectCourseId, setSelectCourseId] = useState<string>('');
    //////////////////////
    const [editorValue, setEditorValue] = useState("");
    const [teachScore, setTeachScore] = useState(0);
    const [workScore, setWorkScore] = useState(0);
    const [roomScore, setRoomScore] = useState(0);
    const [overallScore, setOverallScore] = useState(0)

    // Fetch ค่า blog header 
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

  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(blogInfo => {
        setBlogsInfomation(blogInfo);
        setAuthor(blogInfo[0].user_id);
        fetchCourse(blogInfo[0].course_id)
        fetchReview();
        //console.log(blogInfo);
      });
  }

  // Fetch Review
  const fetchReview = () => {
    BlogsService.fetchReviewOfBlog(blogId)
        .then(reviewArray => {
          let review_info = reviewArray[0];
          if(review_info){
            setTeachScore(review_info.teaching);
            setWorkScore(review_info.hw);
            setRoomScore(review_info.classroom);
            setOverallScore(review_info.overall);
            setEditorValue(review_info.content);
          }else{
            alert("error review not found");
          }
    })  // Done
  };

  //refreh
  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div>
      <div className ="div-scrollbar">
        {blogsInfomation.map(blogInformation=>(
            <div className="Blog_Info">
                <div className="Blog_frame1">
                    <div className="Blog_name">ชื่อบล็อค </div>
                    <div className="Blog_name2">{blogInformation.blog_name}</div>
                    <div className="Blog_name">รหัสวิชา </div>
                    <div className="Blog_name2">{selectCode}</div>
                    <div className="Blog_name">ชื่อวิชา </div>
                    <div className="Blog_name2">{selectNameEn}  ({selectNameTh})</div>
                    <div className="Blog_name">ชื่อวิชา </div>
                    <div className="Blog_name2">{selectTeacher}</div>
                  </div>
              </div>
        ))}
      </div>
      <div className="div-scrollbar editor_text" >
        <div dangerouslySetInnerHTML={{ __html: editorValue }} />
      </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">สอนได้เข้าใจ</label>
                        </Col>
                        <Col>
                            <Progress percent={teachScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({teachScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">จำนวนงาน</label>
                        </Col>
                        <Col>
                            <Progress percent={workScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({workScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">ความสำคัญในการเข้าเรียน</label>
                        </Col>
                        <Col >
                            <Progress percent={roomScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({roomScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">ภาพรวม</label>
                        </Col>
                        <Col>
                            <Progress percent={overallScore*20} showInfo={false}/>
                        </Col>
                        <Col>
                            ({overallScore}/5)
                        </Col>
                    </Row>
                </Container>
            </div>
        
        
      <LikeViewReport x={blogsInfomation}/>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
        <Comment_component 
          blogId = {blogId}
        />
      </div>
      <button onClick={e=>history.goBack()}>back</button>
    </div>
  );
};

export default ReadBlogReview
*/