import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router"
import Modal from 'react-bootstrap/Modal';


import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../components/createblog_component/input.css';
import "./createblog.css"
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
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import 'antd/dist/antd.css';
import {  notification,message , Divider, Space } from 'antd';
import InputGroup from 'react-bootstrap/InputGroup'
import {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
  } from '@ant-design/icons';
import './Home.css';
  
const FilterBar = (props:any) => {
    const resultLimit = 10
    let i = 0;
    let k = 0;
    let check = 0;
    const blogtype = window.location.pathname.split("/")[1]
    console.log(blogtype)
    console.log(window.location.search.split("="))
    var [query,setquery]=useState('');
    const [knowledge,setknowledge] = useState<boolean>(false)
    const [review,setreview] = useState<boolean>(false)
    const [knowledgeandreview,setknowledgeandreview] = useState<boolean>(true);
    const [date,setdate] = useState<boolean>(true)
    const [like,setlike] = useState<boolean>(false)
    const [viewer,setviewer] = useState<boolean>(false)
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

    const [input_subname,setsubname]= useState('');
    const [input_teachername,setteachername] = useState('');


    const [UrlLink, setUrl]=useState<string>("");
    const [afterSave, setafterSave] = useState<boolean>(false);
    const history = useHistory()

    //sort----------------------------------------
    const [type, setValue] = useState([1,2]);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    //---------------------------------------------
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

    const searchquery = () => {
        var querystring:string=''
        var istype=""
        if(knowledgeandreview == true){
            istype="3"
            querystring+="type="+istype
        }
        else if(review == true){
            console.log(type)
            istype="2"
            querystring+="type="+istype
        }
        else if(knowledge == true){
            console.log(type)
            istype="1"
            querystring+="type="+istype
        }
        if(date == true){
            querystring+="&order="+"1"
        }
        else if(like == true){
            querystring+="&order="+"2"
        }
        else if(viewer == true){
            querystring+="&order="+"3"
        }
        if(input_subname!=""){
            querystring+="&subname="+input_subname
        }
        if(input_teachername!==""){
            querystring+="&teachername="+input_teachername
        }
        setquery(querystring)
        console.log(querystring)
        setsubname('')
        setteachername('')
    }

    useEffect(()=>{
        if (query !== ""){
          setFormVisible(!formVisible);
        }
      },[query])
    useEffect(()=>{
        if(formVisible==true){
            window.location.reload()
        }
    },[formVisible])

    useEffect(()=>{
        fetchCourse()
        if(window.location.search.split("=")[0]!==''){
            if(window.location.search.split("=")[1][0]=='1'){
                setknowledge(true);setreview(false);setknowledgeandreview(false);
            }
            else if(window.location.search.split("=")[1][0]=='2'){
                setreview(true);setknowledgeandreview(false);setknowledge(false);
            }
            else if(window.location.search.split("=")[1][0]=='3'){
                console.log("HELLOISUS")
                setknowledgeandreview(true);setreview(false);setknowledge(false);
            }
            if(window.location.search.split("=")[2][0]=='1'){
                setdate(true);setlike(false);setviewer(false);
            }
            else if(window.location.search.split("=")[2][0]=='2'){
                setlike(true);setdate(false);setviewer(false);
            }
            else if(window.location.search.split("=")[2][0]=='3'){
                setviewer(true);setlike(false);setdate(false);
            }
        }
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
    console.log(knowledgeandreview)
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
    //console.log(knowledge);
    //console.log(review);
    //console.log(knowledgeandreview);
//    useEffect(() => {
//        if(knowledge == false && review == false && knowledgeandreview == false) {
//            setknowledgeandreview(true);
//        }
//        if(knowledge == true && review == true) {
//            setknowledge(false);
//            setreview(false);
//            setknowledgeandreview(true);
//        }
//    },[knowledge,review,knowledgeandreview])
//    useEffect(() => {
//        if(date == false && like == false && viewer == false){
//            setdate(true);
//        }
//    },[date,like,viewer])
return (
    <div className="filter-blog">
        <strong>CHOOSE BLOG TYPE</strong> &nbsp;&nbsp;&nbsp;
        <ToggleButtonGroup type="checkbox">
            {knowledge?
                <Button variant="success" >ความรู้</Button>
            :
                <Button variant="secondary" onClick={() => {setknowledge(true);setknowledgeandreview(false);setreview(false)}}>ความรู้</Button>
            }
            {review?
                <Button variant="success" >รีวิว</Button>
            :
                <Button variant="secondary" onClick={() => {setreview(true);setknowledgeandreview(false);setknowledge(false)}}>รีวิว</Button>
            }
            {knowledgeandreview?
                <Button variant="success">ความรู้&รีวิว</Button>
            :
                <Button variant="secondary" onClick={() => {setknowledgeandreview(true);setknowledge(false);setreview(false);}}>ความรู้&รีวิว</Button>
            }
        </ToggleButtonGroup>
        &nbsp;&nbsp;&nbsp; <strong>ORDER</strong> &nbsp;&nbsp;&nbsp;
        <ToggleButtonGroup type="checkbox"> 
            {date?
                <Button variant="success" value={1} >Date</Button>
            :
                <Button variant="secondary" value={1} onClick={() => {setdate(true);setlike(false);setviewer(false);}}>Date</Button>
            }
            {like?
                <Button variant="success" value={2} >Like</Button>
            :
                <Button variant="secondary" value={2} onClick={() => {setlike(true);setdate(false);setviewer(false);}}>Like</Button>
            }
            {viewer?
                <Button variant="success" value={1} >Viewer</Button>
            :
                <Button variant="secondary" value={1} onClick={() => {setviewer(true);setdate(false);setlike(false);}}>Viewer</Button>
            }
        </ToggleButtonGroup>
        <br/>
        {false &&
            <div>
                {codeoption[0]}
                <Row className="Col">
                    
                    <Col sm={2}>
                        <div>Code</div>
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
            </div>
        }
        <div className="margin-filter"><strong>CODE OR SUBJECT NAME</strong></div>
        <FormControl onChange={(e)=>setsubname(e.target.value)}
            placeholder="TYPE SUBJECT CODE OR SUBJECT NAME . . ."
            aria-label="TYPE SUBJECT CODE OR SUBJECT NAME . . ."
            aria-describedby="basic-addon1"
        />
        {false &&
            <div>
                <Row className="Col">
                    <Col sm={2}>
                        <div>Subject Name (Thai)</div>
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
                        <div>Subject Name (English)</div>
                    </Col>
                    <Col>
                        <Select 
                            isDisabled
                            placeholder={selectNameEn}
                        />
                    </Col>
                </Row>
            </div>
        }
        <div className="margin-filter"><strong>TEACHER</strong></div>
        <FormControl onChange={(e)=>setteachername(e.target.value)}
            placeholder="TYPE TEACHER NAME . . ."
            aria-label="TYPE TEACHER NAME . . ."
            aria-describedby="basic-addon2"
        />
        <br />
        
        {false &&
            <div className="Cancel">
                <Button style={{ float: "right" }} variant="danger"> Cancel </Button>
            </div>
        }
        
        <button style={{ float: "right" }} className="btn btn-success" onClick={searchquery}> search </button>
        {formVisible &&
        <div>
          <Redirect to={`/filter/search?${query}`} />
        </div>
        }
    </div>
  );
}

export default FilterBar