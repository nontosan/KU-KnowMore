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
import './report.css';
import Alert from '../photo/alert.png';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import UserCommentAuthor from "../components/UserCommentAuthor";
function MyVerticallyCenteredModal(props:any) {
    const [annoy,setannoy] = useState<boolean>(false)
    const [repeat,setrepeat] = useState<boolean>(false)
    const [implicate,setimplicate] = useState<boolean>(false)
    const [obscenity,setobscenity] = useState<boolean>(false)
    const [wrongcontent,setwrongcontent] = useState<boolean>(false)
    const [overthrow,setoverthrow] = useState<boolean>(false)
    const blogId:string = window.location.pathname.split("/")[2]
    const clearstate=()=>{
        setannoy(false)
        setrepeat(false)
        setimplicate(false)
        setobscenity(false)
        setwrongcontent(false)
        setoverthrow(false)
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Report Blog
          </Modal.Title>
        </Modal.Header>
            <Formik
                initialValues={{
                    etc:""
                }}
                onSubmit={(values,actions)=>{
                  console.log("HELLO REPORT")
                    if(annoy===false && repeat===false && implicate===false && obscenity===false && wrongcontent===false && overthrow===false ){
                        alert("please select report type")
                        actions.setSubmitting(false)
                    }
                    else{
                        alert("save")
                        clearstate()
                        values.etc=""
                        props.onHide()
                        let reportstr:string=""
                        if(annoy===true){
                          reportstr+="โพสก่อกวน,"
                        }
                        if(repeat===true){
                          reportstr+="โพสซ้ำ,"
                        }
                        if(implicate===true){
                          reportstr+="โพสทำให้ผู้อื่นเสียหาย,"
                        }
                        if(obscenity===true){
                          reportstr+="โพสอนาจาร,"
                        }
                        if(wrongcontent===true){
                          reportstr+="โพสไม่ตรงวิชา,"
                        }
                        if(overthrow===true){
                          reportstr+="โพสล้มล้านสถาบัน,"
                        }
                        console.log(values.etc)
                        const Report:any={
                          user_id:"5f82fcc904eb8600aa617b60",
                          content_id:blogId,
                          report_string:values.etc,
                          report_reason:reportstr
                        }
                        ReportService.createReport(Report,blogId).then(res=>
                            console.log(res)
                          )
                    }
                }}
            >
                {({isSubmitting,values})=>(
                    <Form autoComplete="off">
                      <Modal.Body>
                      <div className="show-all-comment">
                            <div className="blog-fl black-font">
                                <div>{props.userid}</div>
                            </div>
                        <div className="blog-fl black-font">
                            {props.content}
                        </div>
                        <div className="blog-fl black-font">
                            {props.datetime}
                        </div>
                    </div>
                        <div className="group_rp_type">
                            {annoy?<Button variant="success" className="blog" onClick={() => setannoy(!annoy)}>โพสก่อกวน</Button>:<Button variant="secondary" className="blog" onClick={()=>setannoy(!annoy)}>โพสก่อกวน</Button>}
                            {repeat?<Button variant="success" className="blog" onClick={() => setrepeat(!repeat)}>โพสซ้ำ</Button>:<Button variant="secondary"className="blog" onClick={()=>setrepeat(!repeat)}>โพสซ้ำ</Button>}
                            {implicate?<Button variant="success" className="blog" onClick={() => setimplicate(!implicate)}>โพสทำให้ผู้อื่นเสียหาย</Button>:<Button variant="secondary" className="blog" onClick={()=>setimplicate(!implicate)}>โพสทำให้ผู้อื่นเสียหาย</Button>}
                            {obscenity?<Button variant="success" className="blog" onClick={() => setobscenity(!obscenity)}>โพสอนาจาร</Button>:<Button variant="secondary" className="blog" onClick={()=>setobscenity(!obscenity)}>โพสอนาจาร</Button>}
                            {wrongcontent?<Button variant="success" className="blog" onClick={() => setwrongcontent(!wrongcontent)}>โพสไม่ตรงวิชา</Button>:<Button variant="secondary" className="blog" onClick={()=>setwrongcontent(!wrongcontent)}>โพสไม่ตรงวิชา</Button>}
                            {overthrow?<Button variant="success" className="blog" onClick={() => setoverthrow(!overthrow)}>โพสล้มล้านสถาบัน</Button>:<Button variant="secondary" className="blog" onClick={()=>setoverthrow(!wrongcontent)}>โพสล้มล้านสถาบัน</Button>}
                        </div>
                        <div style={{height:"50px"}} className="input_container">
                          <Field className="inputt" type="input" name="etc"  placeholder="type something..."/>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button className="btn btn-success" disabled={isSubmitting}> submit </button>
                        <Button onClick={e=>{
                              props.onHide()
                              clearstate()
                          }}>Close</Button>
                      </Modal.Footer>
                    </Form>
                    )}
            </Formik>
      </Modal>
    );
  }

const ReportCmtModal=(props:any)=>{
    const [modalShow, setModalShow] = useState<boolean>(false);
    return (
    <div>
      <NavDropdown.Item onClick={() => setModalShow(true)} className="more-option">Report</NavDropdown.Item>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={props.id}
        blogid={props.blog_id}
        content={props.content}
        datetime={props.date_time}
        userid={props.user_id}
      /> 
    </div>
  );
}

export default ReportCmtModal