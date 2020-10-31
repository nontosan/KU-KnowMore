// IMPORT LIBRARY //
import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Section } from '../interfaces';
import ListGroup from 'react-bootstrap/ListGroup';
import { Blog }from '../interfaces/blog'
import AddSection from '../photo/addsection.png';
import {useHistory} from "react-router"
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import {Formik,Form,Field,ErrorMessage} from "formik"
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import EditBlogContent from '../gadget/editblogcontent';
import ChangeBlogInfoModal from "../modals/ChangBlogInfo"
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
    const path = window.location.pathname
  ///////////////////////////////end copy//////////////////////////////////
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
                <ChangeBlogInfoModal fetchBlogs={fetchBlogs} />
            </div>
            }

          </div>     
            <div className="div-addsection">
              <a href={`/writeSection/${blogId}`}>
                <Button variant="outline-secondary" className="button-addsection">
                  <Image className="addsection" src={AddSection} roundedCircle />
                </Button>
              </a>
            </div>
      </div>
  );
};

export default CreateEditSection
