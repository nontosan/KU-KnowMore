import React,{useState,useEffect,useCallback} from "react"
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Choosefilter from "../gadget/filter_gadget/klorrwfilter"
import Order from "../gadget/filter_gadget/order"
import Subjectname from "../gadget/filter_gadget/Subjectname";
import Subjectid from "../gadget/filter_gadget/Subjectid";
import Teacher from "../gadget/filter_gadget/teacher"
import Image from 'react-bootstrap/Image';
import 'antd/dist/antd.css';
import { notification,message } from 'antd';
import {
  Link, Redirect
} from 'react-router-dom'
import Select from 'react-select';
import Alert from '../photo/alert.png';
import {Course_real} from "../interfaces/course"
import CourseService from "../services/CourseService"
import {Blog,create_Blog} from "../interfaces/blog"
import BlogsService from "../services/BlogsService"
import GearEdit from '../photo/gear-edit6.png';
import GearEditBlack from '../photo/settings-8-xxl.png';
import "./changebloginfo.css"
const key = 'updatable';
function EditBlogModal(props:any) {
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
  const [selectCode,setSelectCode] =useState<string>(props.code);
  const [selectNameTh, setSelectNameTh] = useState<string>(props.subnameth);
  const [selectNameEn, setSelectNameEn] = useState<string>(props.subnameen);
  const [selectTeacher, setSelectTeacher] = useState<string>(props.teacher);
  const [selectCourseId, setSelectCourseId] = useState<string>('');
  const [NameTh,setNameTh] =useState({})
  const [NameEn,setNameEn] =useState({})
  const [Teacher,setTeacher] =useState({})
  const [visible,setVisible] = useState<boolean>(false)
  const [available,setAvailable] = useState<boolean>(false)
  //data for updating
  const [bloginfo,setbloginfo] = useState<Blog[]>([])
  const patkh =window.location.pathname
  const blogId = window.location.pathname.split("/")[2]
  const [blogname,setblogname] = useState<string>(props.blogname)
  const handleChangeCode = (selectedOption:any) => {
      code.push({ selectedOption })
      //console.log((code[0].selectedOption).value);
      setSelectCode((code[0].selectedOption).value);
      setSelectTeacher('');
  }

  const handleChangeTeacher = (selectedOption:any) => {
      setSelectCourseId(selectedOption.value);
      setSelectTeacher(selectedOption.label);
  }
  
  const fetchCourse =async()=>{
      const x = await CourseService.fetchCourse().then(res=>{
          setCourse(res)
          setAllCourse(res);
          res.forEach((value,index)=>{
              codeoption.push({ value: value.Code, label: value.Code })
          })
      })
      setCodeOptions(codeoption);
      setAvailable(true);
  }
  const openMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'already edit blog ', key, duration: 2 });
    }, 200);
  };
  const handleeditblog=()=>{
    console.log("editblog")
    if(selectCourseId!==""){
      if(selectTeacher==''){
        openNotificationNot()
      }
      else{
      const editblog:create_Blog={
        user_id: bloginfo[0].user_id,
        type: bloginfo[0].type,
        blog_name: blogname,
        course_id: selectCourseId,
      }
      BlogsService.editBlog(editblog,blogId).then(e=>{
        console.log(e)
        props.callback();
      })
      openMessage()
      props.onHide()
      }
    }
    else{
      openNotificationNot()
    }
    //props.fetchBlogs()
  }
  const fetchBloginfo=()=>{
    BlogsService.fetchBlogSpecific(blogId).then(res=>{
      setbloginfo(res)
      //console.log(res)
    })
  }

  const openNotificationNotTeacher = () => {
    notification.info({
      message: `Notification `,
      description:
        'Please select teacher',
    });
  }
  const openNotificationNot = () => {
    notification.info({
      message: `Notification `,
      description:
        'Please complete form for editing blog content',
    });
  };
  useEffect(()=>{
      fetchCourse()
      fetchBloginfo()
  },[])

  useEffect(()=>{
      if (available!==undefined){
          setVisible(true);
      }
  },[available])

  useEffect(()=>{
      if(selectCode!==undefined){
          //console.log(selectCode);
          //console.log("HELLO");
          {allCourse.map(item => {
              if(item.Code==selectCode){
                  if(check == 0){
                      setSelectNameTh(item.NameTh)
                      setSelectNameEn(item.NameEn)
                      check = 1;
                  }
                  Teacheroption.push({ value: item.id, label: item.Teacher })
              }
          })}
          console.log(Teacheroption);
          setTeacherOptions(Teacheroption);
      }
  },[selectCode])
  useEffect(()=>{
      if(selectCourseId!==undefined){
          console.log(selectCourseId);
          console.log(selectTeacher);
      }
  },[selectCourseId])
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="hot-kl x">
              {visible &&
                  <div>
                      <div>BLOG NAME</div>
                      <Form.Control type="text" value={blogname} onChange={e => setblogname(e.target.value)} />
                      {codeoption[0]}
                      <div>Subject ID</div>
                          <Select 
                              options = {codeOptions} 
                              defaultInputValue = {selectCode}
                              onChange={handleChangeCode}
                              isSearchable
                              filterOption={({label}, query) => label.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
                              onInputChange={() => { i = 0 }}
                          />
                      <div>Subject Name (TH)</div>
                          <Select 
                              isDisabled
                              placeholder={selectNameTh}
                          />
                      <div>Subject Name (EN)</div>
                          <Select 
                              isDisabled
                              placeholder={selectNameEn}
                          />

                      <div>Teacher</div>
                          <Select 
                              options = {teacherOptions} 
                              defaultInputValue = {selectTeacher}
                              onChange={handleChangeTeacher}
                              isSearchable
                          />
                  </div>
              }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e=>{
            handleeditblog()
          }}>Submit</Button>
          <Button onClick={e=>{
              props.onHide()
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const ChangeBlogInfoModal=(props:any)=>{
    const [modalShow, setModalShow] = useState<boolean>(false);
    //const [code, setcode] = useState<string>('');
    //const [teacher, setteacher] = useState<string>('');
    //const init = () => {
    //  CourseService.fetchCourseWithId(props.coursecode)
    //  .then(res=>{
    //    res.map(item=>{
    //      setcode(item.Code);
    //      setteacher(item.Teacher);
    //    })
    //  })
    //}
    //console.log(code);
    //useEffect(()=>{
    //  init();
    //},[])
    return (
    <div>
      <Button className="blog-delete-button" onClick={() => 
        setModalShow(true)
      }>
          <Image className="gear-setting-pic blog-fl" src={GearEdit}></Image>          
      </Button>

      <EditBlogModal
        show={modalShow}
        blogname={props.nameblog}
        code={props.code}
        subnameth={props.subnameth}
        subnameen={props.subnameen}
        teacher={props.teacher}
        callback={props.callback}
        onHide={() => {
          setModalShow(false)
          console.log("edit???")
        }}
      /> 
    </div>
  );
}

export default ChangeBlogInfoModal