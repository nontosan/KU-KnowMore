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
        //console.log(blogInfo);
      });
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
    fetchBlogs();
  },[])

  return (
    <div>
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
      <div>------------------------------load draft data display here----------------------------</div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">สอนได้เข้าใจ</label>
                        </Col>
                        <Col>
                            {teachScore}
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
                    </Row>
                </Container>
            </div>
        
        
      <LikeViewReport x={blogsInfomation}/>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
        <Comment_component />
      </div>
      <button onClick={e=>history.goBack()}>back</button>
    </div>
  );
};

export default ReadBlogReview
