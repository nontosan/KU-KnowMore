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
import '../components/section.css';
import Alert from '../photo/alert.png';
import DisplayFile from '../components/DisplayFile'
function LoadFile(props:any) {
    //dosomething about load
    const sectionId = window.location.pathname.split("/")[2]
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            FILE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <DisplayFile secid = {sectionId}/>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={e=>{props.onHide()}}>Close</Button>
        </Modal.Footer>    
      </Modal>
    );
  }

const LoadFileModal=()=>{
    const [modalShow, setModalShow] = useState<boolean>(false);
    return (
    <div>
      <Button variant="info" onClick={() => setModalShow(true)}>
        FILE
      </Button>
      <LoadFile
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> 
    </div>
  );
}

export default LoadFileModal