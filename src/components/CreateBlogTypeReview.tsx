import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router"


import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';
import CourseService from "../services/CourseService"
import {
  Link, Redirect,
} from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik"
import { Course, Course_real } from '../interfaces/course';
import '../App.css';
import BlogsService from '../services/BlogsService';
import {Blog,create_Blog} from "../interfaces/blog"
import { Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
//------------------------------------------------------------------//
import 'antd/dist/antd.css';
import {  notification,message } from 'antd';

const key = 'updatable';
const CreateKlBlog=()=> {
    const resultLimit = 10
    let i = 0;
    let k = 0;
    let check = 0;
    const blogtype = window.location.pathname.split("/")[1]
    console.log(blogtype)
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
    const [NameTh,setNameTh] =useState({})
    const [NameEn,setNameEn] =useState({})
    const [Teacher,setTeacher] =useState({})
    const [visible,setVisible] = useState<boolean>(false)
    const [available,setAvailable] = useState<boolean>(false)



    const [UrlLink, setUrl]=useState<string>("");
    const [afterSave, setafterSave] = useState<boolean>(false);
    const history = useHistory()
//    const resetvalue=()=>{
//        const codeoption=[{}]
//        const NameThoption=[{}]
//        const NameEnoption=[{}]
//        const Teacheroption=[{}]
//            
//    }
    const handleChangeCode = (selectedOption:any) => {
        code.push({ selectedOption })
        //console.log((code[0].selectedOption).value);
        setSelectCode((code[0].selectedOption).value);
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

    useEffect(()=>{
        fetchCourse()
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
    const openMessage = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
          message.success({ content: 'Already create blog', key, duration: 2 });
        }, 500);
      };
    const close = () => {
        console.log(
          'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
      };
    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary"  onClick={() => {
            notification.close(key)
            window.location.replace("http://localhost:3000/");
          }}>
            Confirm
          </Button>
        );
        notification.open({
          message: 'Notification Cancel create blog',
          description:
            'Would you like to discard your blog',
          btn,
          key,
          onClose: close,
        });
      };
    const openNotificationNot = () => {
        notification.info({
          message: `Notification `,
          description:
            'Please complete form before submitting',
        });
    };
    useEffect(()=>{
        if(selectCourseId!==undefined){
            console.log(selectCourseId);
            console.log(selectTeacher);
        }
    },[selectCourseId])
    useEffect(() => {
        if (UrlLink !== ""){
          console.log(UrlLink);
          setafterSave(!afterSave);
        }
      },[UrlLink]);
    return (
        <div className="hot-kl container_real">
            {localStorage.accessToken==undefined &&
                <div className="blog_container">
                    <Modal 
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show="true"
                    >
                        <Modal.Body>
                            Please Login First...
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="Cancel">
                                <Button className="cancel-button" variant="danger" onClick={e=>history.goBack()}>Cancel</Button>
                            </div>
                            <div className="Submit">
                                <Link to="/login">
                                    <Button className="submit-button" variant="success">Submit</Button>
                                </Link>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            }
            {localStorage.accessToken!=undefined &&
                <div className="container_real">
                    <Formik
                        initialValues={{nameblog:""}}
                        onSubmit={(values,actions)=>{
                        //console.log("hello")
                        if(values.nameblog!=="" && selectCode!=="" && selectTeacher!==""){
                            const newBlog={
                                user_id: localStorage.userId,
                                type: "review",
                                blog_name: values.nameblog,
                                course_id: selectCourseId
                            }
                            BlogsService.createBlog(newBlog).then(res=>{
                                if(res!==null){
                                    setUrl(res.id)
                                }
                                console.log(res)
                            })
                            openMessage()
                        }
                        else{
                            openNotificationNot()
                        }
                        actions.setSubmitting(false)
                        }}
                    >
                        {({isSubmitting})=>(
                            <div className="container_real">
                            <div className="create_rw">
                                <strong className="create-kl-font-size">C R E A T E&nbsp;&nbsp;&nbsp;&nbsp;R E V I E W</strong> 
                            </div>
                            <Form className="blog_container" autoComplete="off" style={{ backgroundColor:"white" }}>
                                <Row className="Col">
                                    <Col sm={2}>
                                    <div><strong>BLOG NAME</strong></div>
                                    </Col>
                                    <Col>
                                    <Field className="input_blogname" type="input" name="nameblog"/>
                                    </Col>
                                </Row>
                                
                                {visible &&
                                    <div>
                                        {codeoption[0]}
                                        <Row className="Col">
                                            <Col sm={2}>
                                                <div><strong>SUBJECT CODE</strong></div>
                                            </Col>
                                            <Col>
                                            <Select 
                                                options = {codeOptions} 
                                                onChange={handleChangeCode}
                                                isSearchable
                                                filterOption={({label}, query) => label.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
                                                onInputChange={() => { i = 0 }}
                                            />
                                            </Col>
                                        </Row>
                                        <Row className="Col">
                                            <Col sm={2}>
                                                <div><strong>SUBJECT NAME (THAI)</strong></div>
                                            </Col>
                                            <Col>
                                            <Select 
                                                isDisabled
                                                placeholder={selectNameTh}
                                            />
                                            </Col>
                                        </Row>
                                        <Row className="Col">
                                            <Col sm={2}>
                                                <div><strong>SUBJECT NAME (ENGLISH)</strong></div>
                                            </Col>
                                            <Col>
                                            <Select 
                                                isDisabled
                                                placeholder={selectNameEn}
                                            />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col sm={2}>
                                                <div><strong>TEACHER</strong></div>
                                            </Col>
                                            <Col>
                                            <Select 
                                                options = {teacherOptions} 
                                                onChange={handleChangeTeacher}
                                                isSearchable
                                            />
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                <br />
                                <div className="Cancel">
                                    <Button style={{ float: "right" }} variant="danger" onClick={e=>openNotification()}> Cancel </Button>
                                </div>
                                <div className="Submit">
                                    <button style={{ float: "right" }} className="btn btn-success submit-button" disabled={isSubmitting}> Submit </button>
                                    {afterSave &&
                                        <div>
                                            <Redirect to={`myReview/${UrlLink}`} />
                                        </div>
                                    }
                                </div>
                                
                            </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            }
            
        </div>   
    );
}
      

export default CreateKlBlog;