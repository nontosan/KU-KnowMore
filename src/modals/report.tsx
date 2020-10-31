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

import Alert from '../Photo/alert.png';
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
            Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                initialValues={{
                    etc:""
                }}
                onSubmit={(values,actions)=>{
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
                    <Form>
                        <div className="Blog_frame1">
                            {annoy?<Button variant="danger" onClick={e=>setannoy(!annoy)} >โพสก่อกวน</Button>:<Button variant="secondary" onClick={e=>setannoy(!annoy)}>โพสก่อกวน</Button>}
                            {repeat?<Button variant="danger" onClick={e=>setrepeat(!repeat)}>โพสซ้ำ</Button>:<Button variant="secondary" onClick={e=>setrepeat(!repeat)}>โพสซ้ำ</Button>}
                            {implicate?<Button variant="danger" onClick={e=>setimplicate(!implicate)}>โพสทำให้ผู้อื่นเสียหาย</Button>:<Button variant="secondary" onClick={e=>setimplicate(!implicate)}>โพสทำให้ผู้อื่นเสียหาย</Button>}
                            {obscenity?<Button variant="danger" onClick={e=>setobscenity(!obscenity)}>โพสอนาจาร</Button>:<Button variant="secondary" onClick={e=>setobscenity(!obscenity)}>โพสอนาจาร</Button>}
                            {wrongcontent?<Button variant="danger" onClick={e=>setwrongcontent(!wrongcontent)}>โพสไม่ตรงวิชา</Button>:<Button variant="secondary" onClick={e=>setwrongcontent(!wrongcontent)}>โพสไม่ตรงวิชา</Button>}
                            {overthrow?<Button variant="danger" onClick={e=>setoverthrow(!overthrow)}>โพสล้มล้านสถาบัน</Button>:<Button variant="secondary" onClick={e=>setoverthrow(!wrongcontent)}>โพสล้มล้านสถาบัน</Button>}
                            <Field type="input" name="etc"/>
                            <button disabled={isSubmitting}> submit </button>
                        </div>
                    </Form>
                    )}
            </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e=>{
              props.onHide()
              clearstate()
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const ReportModal=()=>{
    const [modalShow, setModalShow] = useState<boolean>(false);
    return (
    <div>
      <Button onClick={() => setModalShow(true)}>
        <Image style={{ display: "inline" }} className="likebar-pic" src={Alert}/>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> 
    </div>
  );
}

export default ReportModal