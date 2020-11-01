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
import ReviewServices from "../services/ReviewServices"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog }from '../interfaces/blog';
import { Course,Course_real } from '../interfaces/course'
import { User_Sch } from '../interfaces/user';
import {Review } from "../interfaces/blog"
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import  "./editreview.css"
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './readknowledge.css';
import { Progress } from 'antd';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import "./file.css";
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
//------------------------------------------------------------------//

const ReadBlogKnowledge = (props:any) => {
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
  const [courseInformation, setCourseInformation] = useState<Course_real[]>([]);
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
  const [reviewId, setReviewId] = useState("");
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
          if(review_info.id){
            setReviewId(review_info.id);
          }
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
const handleEditReviewSave = (blogid : string) => {
  const editReview: Review = {
    blog_id: blogid,
    teaching: teachScore,
    hw: workScore,
    classroom: roomScore,
    overall: overallScore,
    content: editorValue,
  };
  ReviewServices.editReview(editReview,reviewId)
    .then(editNewReview => {
      if (editNewReview !== null) {
        alert("แก้ไข Review สำเร็จ");
      } else{
        alert("แก้ไข Review ไม่สำเร็จ");
      }
    });
}
/////////dropdown///////////////
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};
const ScoreValue = [
  { value: '1', label: '1', color: '#FF8B00' },
  { value: '2', label: '2', color: '#FFC400' },
  { value: '3', label: '3', color: '#36B37E' },
  { value: '4', label: '4', color: '#00875A' },
  { value: '5', label: '5', color: '#253858' },
];
const formatGroupLabel = (data:any) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span className={"groupBadgeStyles"}>{ScoreValue.length}</span>
  </div>
);
//////////////////////////////////
  //refreh
  useEffect(()=>{
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
      <div className="hot-kl">
        {blogsInformation.map(blogInformation=>(
          <Card.Header>
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
                        <DeleteModal className=""
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
      <div className="hot-kl editcontainer">
        <Card.Header>Information</Card.Header>
        <div className="div-scrollbar editor_text" >
        <div className="Editor">
            <ReactQuill 
              placeholder={"เขียนรีวิวลงที่นี้"}
              theme="snow" 
              value={editorValue} 
              onChange={setEditorValue}
            />
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
                        <Col className="dropdown">
                            <div className="edit">edit </div>
                            <Select
                              options={ScoreValue}
                              onChange={(e:any)=>{
                                setTeachScore(e.value)
                              }}
                            />
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
                        <Col className="dropdownn">
                            <div className="edit">edit </div>
                            <Select
                              options={ScoreValue}
                              onChange={(e:any)=>{
                                setWorkScore(e.value)
                              }}
                            />
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
                        <Col className="dropdown">
                            <div className="edit">edit </div>
                            <Select
                              options={ScoreValue}
                              onChange={(e:any)=>{
                                setRoomScore(e.value)
                              }}
                            />
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
                        <Col className="dropdown">
                            <div className="edit">edit </div>
                            <Select
                              options={ScoreValue}
                              onChange={(e:any)=>{
                                setOverallScore(e.value)
                              }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
      </div>
      <div className="Confirm"> 
              
              <div className="Cancel">
                <a href={`http://localhost:3000/review/${blogId}`}>
                  <Button className="cancel-button" variant="danger">Cancel</Button>
                </a>
              </div>
              <div className="Submit">
                <a href={`http://localhost:3000/review/${blogId}`}>
                  <Button className="submit-button" variant="success" onClick={e => handleEditReviewSave(blogId)}>Submit</Button>
                </a>
              </div>
              
        </div>
        <div className="editreview_button">
          <Button variant="secondary" onClick={e=>{history.goBack()}}>back</Button>
        </div>
    </div>
  );
};

export default ReadBlogKnowledge





/*

/*
// IMPORT LIBRARY //
import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Section } from '../interfaces';
import ListGroup from 'react-bootstrap/ListGroup';
import AddSection from '../photo/addsection.png';
import {useHistory} from "react-router"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreateReviewContent from './Review_component/CreateReviewContent';
import { Blog,Review,create_Blog } from '../interfaces/blog';
import { Col, Container, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import {Formik,Form,Field,ErrorMessage} from "formik"
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import EditBlogContent from '../gadget/editblogcontent';
import ReportModal from "../modals/ChangBlogInfo"
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import  loadeditsection from "../services/loadeditsection";
import BlogsService from "../services/BlogsService"
import SectionService from "../services/SectionService";
import CourseService from "../services/CourseService"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Section_Edit } from '../interfaces/SectionEdit';
import { Course, Course_real } from '../interfaces/course';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

// IMPORT PHOTO //
// END OF IMPORT PHOTO //
import Dropdowntest from "../gadget/create_blog"
import ReviewServices from '../services/ReviewServices';
//------------------------------------------------------------------//

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}
const EditReview = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  const blogId =window.location.pathname.split("/")[2] // ดึงค่า BlogId จาก Url 
  const history = useHistory()
  ///////////////////////////////copy/////////////////////////////////////
  const resultLimit = 10
    let i = 0;
    let k = 0;
    let check = 0;
    const [allCourse,setAllCourse] = useState<any[]>([]);
    const codeoption:any[]=[]
    const Teacheroption:any[]=[]
    const [codeOptions,setCodeOptions] = useState<any[]>([]);
    const [teacherOptions,setTeacherOptions] = useState<any[]>([]);
    const [course,setCourse] = useState<Course_real[]>([])
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<string>('');
    const [selectNameTh, setSelectNameTh] = useState<string>('');
    const [selectNameEn, setSelectNameEn] = useState<string>('');
    const [selectTeacher, setSelectTeacher] = useState<string>('');
    const [selectCourseId, setSelectCourseId] = useState<string>('');
    const [visible,setVisible] = useState<boolean>(false)
  ///////////////////////////////end copy//////////////////////////////////
  const [reviewId, setReviewId] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [teachScore, setTeachScore] = useState(0);
  const [workScore, setWorkScore] = useState(0);
  const [roomScore, setRoomScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0)


  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(async(blogInfo) => {
        //console.log(blogInfo)
        setBlogsInfomation(blogInfo);
        setSelectCourseId(blogInfo[0].course_id);
        fetchCourse(blogInfo[0].course_id);
        //finding course_i
      })
  }

  const fetchReview = () => {
    BlogsService.fetchReviewOfBlog(blogId)
        .then(reviewArray => {
          let review_info = reviewArray[0];
          if(review_info.id){
            setReviewId(review_info.id);
          }
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


  const handleEditReviewSave = (blogid : string) => {
    const editReview: Review = {
      blog_id: blogid,
      teaching: teachScore,
      hw: workScore,
      classroom: roomScore,
      overall: overallScore,
      content: editorValue,
    };
    ReviewServices.editReview(editReview,reviewId)
      .then(editNewReview => {
        if (editNewReview !== null) {
          alert("แก้ไข Review สำเร็จ");
        } else{
          alert("แก้ไข Review ไม่สำเร็จ");
        }
      });
  }
  const fetchCourse =(x:string)=>{
    CourseService.fetchCourse().then(res=>{
        setCourse(res)
        setAllCourse(res);
        res.forEach((value,index)=>{
            codeoption.push({ value: value.Code, label: value.Code })
            //console.log(x)
            if(value.id===x){
              console.log("found")
              setSelectCode(value.Code)
              setSelectNameTh(value.NameTh)
              setSelectNameEn(value.NameEn)
              setSelectTeacher(value.Teacher)
            }
        })
        setVisible(true);
    })
    setCodeOptions(codeoption);
}
  
  useEffect(()=>{
      fetchBlogs();
      fetchReview();
  },[])
  return (
    <div>
          <div className="bg_color">
            {visible &&
              <div className="Blog_Info">
              <div className="Blog_frame1">
                  <div className="Blog_name">ชื่อบล็อค </div>
                  <div className="Blog_name2">{blogsInfomation[0].blog_name}</div>
                  <div className="Blog_name">รหัสวิชา </div>
                  <div className="Blog_name2">{selectCode}</div>
                  <div className="Blog_name">ชื่อวิชา </div>
                  <div className="Blog_name2">{selectNameEn}  ({selectNameTh})</div>
                  <div className="Blog_name">ชื่อวิชา </div>
                  <div className="Blog_name2">{selectTeacher}</div>
                </div>
                <ReportModal fetchBlogs={fetchBlogs} />
            </div>
            }
            <div className="Blog_Content">
        <div className="Editor">
            <ReactQuill 
              placeholder={"เขียนรีวิวลงที่นี้"}
              theme="snow" 
              value={editorValue} 
              onChange={setEditorValue}
            />
        </div>
        <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">สอนได้เข้าใจ</label>
                        </Col>
                        <Col>
                            {teachScore}
                        </Col>
                        <Col >
                            button modal edit value
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
                            {workScore}
                        </Col>
                        <Col >
                            button modal edit value
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
                            {roomScore}
                        </Col>
                        <Col >
                            button modal edit value
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
                            {overallScore}
                        </Col>
                        <Col >
                            button modal edit value
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="Confirm"> 
              <Link to="/">
                <div className="Cancel">
                  <Button className="cancel-button" variant="danger">Cancel</Button>
                </div>
              </Link>
              <Link to="/">
                <div className="Submit">
                  <Button className="submit-button" variant="success" onClick={e => handleEditReviewSave(blogId)}>Submit</Button>
                </div>
          </Link>
        </div>
        </div>
      </div>
  
      </div>
  );
};

export default EditReview
*/