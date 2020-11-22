
// IMPORT LIBRARY //
import React, { useState,useEffect, useImperativeHandle,Suspense } from 'react'
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
import ChangeBlogInfoModal from "../modals/ChangBlogInfo"

// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import  loadeditsection from "../services/loadeditsection";
import BlogsService from "../services/BlogsService"
import ProfileService from '../services/ProfileService';
import SectionService from "../services/SectionService";
import CourseService from "../services/CourseService"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Section_Edit } from '../interfaces/SectionEdit';
import { Course, Course_real } from '../interfaces/course';
import { User_Sch } from '../interfaces/user';

// END OF IMPORT INTERFACE//

// IMPORT CSS //
import  "./createeditreview.css"
import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { notification, Divider, Space } from 'antd';
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import { Progress } from 'antd';
import ImageComponent from './Display';

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
const CreateEditSection = (props:any) => {
  const ScoreValue = [
    { value: '1', label: '1', color: '#FF8B00' },
    { value: '2', label: '2', color: '#FFC400' },
    { value: '3', label: '3', color: '#36B37E' },
    { value: '4', label: '4', color: '#00875A' },
    { value: '5', label: '5', color: '#253858' },
  ];
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  const blogId =window.location.pathname.split("/")[2]
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
  const [editorValue, setEditorValue] = useState("");
  const [teachScore, setTeachScore] = useState(0);
  const [workScore, setWorkScore] = useState(0);
  const [roomScore, setRoomScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0)
  const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
  const [courseInformation, setCourseInformation] = useState<Course_real[]>([]);
  const [blogsInformation,setBlogsInformation] = useState<Blog[]>([]);
  const [author, setAuthor] = useState<string>('');
  const [aftercancel,setaftercancel] = useState<boolean>(false)
  const [aftersave,setaftersave] = useState<boolean>(false)
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

  const handleNewReviewSave = (blogid : string) => {
    if(teachScore!==0 && workScore!==0 && roomScore!==0 && overallScore!==0){
      const newReview: Review = {
        blog_id: blogid,
        teaching: teachScore,
        hw: workScore,
        classroom: roomScore,
        overall: overallScore,
        content: editorValue,
      };
      BlogsService.createReview(newReview,blogid) 
        .then(savedNewReview => {
          if (savedNewReview !== null) {
            alert("บันทึก blog สำเร็จ");
            setaftersave(true)
          } else{
            alert("บันทึก blog ล้มเหลว");
          }
        }); 
      
    }else{
      openNotificationnot()
    }
  }
  // Fetch Id ของ course 
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
  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  //get /blogs/blogid/viewing
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
          <Button type="primary"  onClick={() =>{
             BlogsService.deleteBlog(blogId)
             notification.close(key)
             console.log("already delete")
             setaftercancel(true)
          }}>
            Confirm
          </Button>
      
    );
    notification.open({
      message: 'Notification',
      description:
        'Would you like to discard this blog',
      btn,
      key,
      onClose: close,
    });
  };
  const openNotificationnot = ()=> {
    notification.info({
      message: `Notification Can't Save`,
      description:
        'Please complete assign value in form',
    });
  };

  const fetchProfile = () => {
    ProfileService.fetchProfileSpecific(author)
      .then(userInfo => {
        setUserInformation(userInfo);
      })
  }

  useEffect(()=>{
    if(author!==''){
      console.log(author);
      fetchProfile();
    }
  },[author])
  useEffect(()=>{
      fetchBlogs();
  },[])
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
          <div className="bg_color">

            <div className="Blog_Content">
        <div className="hot-kl editcontainer">
        <Card.Header>Information</Card.Header>
        <div className="EditReview_Blog">
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
                        <Col className="dropdownn">
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
                        <Col className="dropdownn">
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
                        <Col className="dropdownn">
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
              <Button className="cancel-button" variant="danger" onClick={e=>openNotification()}>Cancel</Button>
              {aftercancel &&
                    <div>
                      <Redirect to={`/`} />
                  </div>
              }
            </div>
            <div className="Submit">
              <Button className="submit-button" variant="success" onClick={e=>handleNewReviewSave(blogId)}>Submit</Button>
              {aftersave &&
                    <div>
                      <Redirect to={`/`} />
                  </div>
              }
            </div>
        </div>
      </div>
      
      </div>
        </div>     
            
      </div>
  );
};

export default CreateEditSection

/*
// IMPORT LIBRARY //
import {
    Link,
  } from 'react-router-dom';
  import { EmptyState } from 'react-wysiwyg-typescript';
  import { convertToRaw } from 'draft-js';
  import Button from 'react-bootstrap/Button';
  // END OF IMPORT LIBRARY //
  import React, { useState, useEffect, useMemo } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  import { Blog,Review,create_Blog } from '../interfaces/blog';
  import { Course } from '../interfaces/course';
  
  // IMPORT COMPONENT //
  import Input_Nameblog from './createblog_component/input_nameblog';
  import Input_Idclass from './createblog_component/input_idclass';
  import Input_Nameclass from './createblog_component/input_nameclass';
  import Input_Nameteacher from './createblog_component/input_nameteacher';
  import Confirm from './createblog_component/confirm';
  import './createblog_component/input.css';
  import CreateReviewContent from './Review_component/CreateReviewContent';
  // END OF IMPORT COMPONENT //
  
  // IMPORT SERVICE //
  import BlogsService from '../services/BlogsService';
  // END OF IMPORT SERVICE //
  
  // IMPORT INTERFACE //
  // END OF IMPORT INTERFACE//
  
  // IMPORT CSS //
  import 'bootstrap/dist/css/bootstrap.min.css';
  // END OF IMPORT CSS //
  
  //------------------------------------------------------------------//
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  import { propTypes } from 'react-bootstrap/esm/Image';
  import CourseService from '../services/CourseService';
  
  // Component head
  const CreateRwBlog=(props : any)=> {
    const [blogName, setBlogName]=useState("");
    const [teacherName, setTeacherName]=useState("");
    const [courseCode, setCourseCode]=useState("");
    const [courseName, setCourseName]=useState("");
    // Review State
    const [teachScore, setTeachScore] = useState(0);
    const [workScore, setWorkScore] = useState(0);
    const [roomScore, setRoomScore] = useState(0);
    const [overallScore, setOverallScore] = useState(0);
    const [editorValue, setEditorValue] = useState("");
    // Etc
    const blogId = window.location.pathname.split("/")[2];
    
  
    useEffect(() => {
      //alert("component rendered")
      if(blogId){
        BlogsService.fetchReviewOfBlog(blogId)
        .then(reviewArray => {
          let review_info = reviewArray[0];
          setTeachScore(review_info.teaching);
          setWorkScore(review_info.hw);
          setRoomScore(review_info.classroom);
          setOverallScore(review_info.overall);
          setEditorValue(review_info.content);  // Done
          BlogsService.fetchBlogSpecific(blogId)
          .then(blogArray => {
            let blog_info = blogArray[0];
            setBlogName(blog_info.blog_name); // Done
            setCourseCode(blog_info.course_id); // Done
            CourseService.fetchCourseFilter(blog_info.course_id,props.teacher_name)
            .then(courseArray => {
              let course_info = courseArray[1];
              //setTeacherName(course_info.teacher_name);
              //setCourseName(course_info.course_name);         
            })
          })
        });
      }
    },[])
  
    // CreateNewBlog function
    const handleNewBlogSave = () => {
      const newBlog: create_Blog = {
        course_id: courseCode,
        user_id: "5f82fd5504eb8600aa617b6b",
        type: "review",
        blog_name: blogName,
      };
      BlogsService.createBlog(newBlog) 
        .then(savedNewBlog => {
          if (savedNewBlog !== null) {
            alert("Save Blog Success");
            if(savedNewBlog.id){
              //alert(savedNewBlog.id);
              handleNewReviewSave(savedNewBlog.id);
            }
          } else{
            //alert("Save Error");
          }
        });
    };
  
    const handleNewReviewSave = (blogid : string) => {
      const newReview: Review = {
        blog_id: blogid,
        teaching: teachScore,
        hw: workScore,
        classroom: roomScore,
        overall: overallScore,
        content: editorValue,
      };
      BlogsService.createReview(newReview,blogid) 
        .then(savedNewReview => {
          if (savedNewReview !== null) {
            alert("Save Review Success");
          } else{
            //alert("Save Error");
          }
        });
    }
  
    return (
      <div className="bg_color">
        <div className="header_word">
          <h1>สร้าง Review ใหม่</h1>
        </div>
       <div className="Blog_Info">
        <Input_Nameblog setNameblog={setBlogName} type={props.blogtype} value={blogName}/>
        <Input_Idclass setIDclass={setCourseCode} type={props.blogtype} value={courseCode}/>
        <Input_Nameclass setNameclass={setCourseName} type={props.blogtype} value={courseName}/>
        <Input_Nameteacher setNameteacher={setTeacherName} type={props.blogtype} value={teacherName}/>
      </div>
      <div className="Blog_Content">
        <div className="Editor">
            <ReactQuill 
              placeholder={"เขียนรีวิวลงที่นี้"}
              theme="snow" 
              value={editorValue} 
              onChange={setEditorValue}
            />
        </div>
        <div className="Slider">
          <CreateReviewContent 
          setTeachScore={setTeachScore} 
          setWorkScore={setWorkScore} 
          setRoomScore={setRoomScore} 
          setOverallScore={setOverallScore} 
          />
        </div>
      </div>
        <div className="Confirm"> 
          <Link to="/">
            <div className="Cancel">
              <Button className="cancel-button" variant="danger">Cancel</Button>
            </div>
          </Link>
          <Link to="/">
            <div className="Submit">
              <Button className="submit-button" variant="success" onClick={handleNewBlogSave}>Submit</Button>
            </div>
          </Link>
        </div>
      </div>
  
    );
  }
  export default CreateRwBlog
*/