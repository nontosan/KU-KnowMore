import React,{useState,useEffect,useCallback} from "react"
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Choosefilter from "../gadget/filter_gadget/klorrwfilter"
import Order from "../gadget/filter_gadget/order"
import Subjectname from "../gadget/filter_gadget/Subjectname";
import Subjectid from "../gadget/filter_gadget/Subjectid";
import Teacher from "../gadget/filter_gadget/teacher"
import Image from 'react-bootstrap/Image';
import ReportService from "../services/ReportService"
import {
  Link, Redirect
} from 'react-router-dom'
import {Formik,Form,Field} from "formik"
import Select from 'react-select';
import Alert from '../photo/alert.png';
import {Course_real} from "../interfaces/course"
import CourseService from "../services/CourseService"
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
  const handleeditblog=()=>{
    console.log("editblog")
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
            Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="hot-kl">
              {visible &&
                  <div>
                      {codeoption[0]}
                      <div>code</div>
                          <Select 
                              options = {codeOptions} 
                              onChange={handleChangeCode}
                              isSearchable
                              filterOption={({label}, query) => label.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
                              onInputChange={() => { i = 0 }}
                          />
                      <div>NameTh</div>
                          <Select 
                              isDisabled
                              placeholder={selectNameTh}
                          />
                      <div>NameEn</div>
                          <Select 
                              isDisabled
                              placeholder={selectNameEn}
                          />

                      <div>Teacher</div>
                          <Select 
                              options = {teacherOptions} 
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
          }}>Edit</Button>
          <Button onClick={e=>{
              props.onHide()
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const ReportModal=(props:any)=>{
    const [modalShow, setModalShow] = useState<boolean>(false);
    return (
    <div>
      <Button onClick={() => 
        setModalShow(true)
      }>
        Edit blog
      </Button>

      <EditBlogModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> 
    </div>
  );
}

export default ReportModal