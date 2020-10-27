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
//------------------------------------------------------------------//

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
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(async(blogInfo) => {
        //console.log(blogInfo)
        setBlogsInfomation(blogInfo);
        setSelectCourseId(blogInfo[0].course_id)
        fetchCourse(blogInfo[0].course_id)
        //finding course_i
      })
  }
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
          alert("บันทึก blog สำเร็จ");
        } else{
          alert("บันทึก blog ล้มเหลว");
        }
      });
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
  
  const fetchsection = () => {
    SectionService.fetchSections(blogId)
      .then(Arraysections => {
        setSectionsInformation(Arraysections);
      });
  }    
  useEffect(()=>{
      fetchBlogs();
      fetchsection();
    
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
              <Button className="submit-button" variant="success" onClick={e=>handleNewReviewSave(blogId)}>Submit</Button>
            </div>
          </Link>
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