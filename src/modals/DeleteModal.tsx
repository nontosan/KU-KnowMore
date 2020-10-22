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
import {
  Link, Redirect
} from 'react-router-dom'
import { couldStartTrivia } from "typescript";


const DeleteModal = (props:any) => {
  console.log(props.nameBlog)
  console.log(props.show);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          DELETE THIS BLOCK?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        BLOCK NAME : {props.nameBlog}
        {props.show}
      </Modal.Body>
      <Modal.Footer>
        <div className="Cancel">
          <Button className="cancel-button" variant="danger" onClick={props.cancel}>Cancel</Button>
        </div>
        <div className="Submit">
          <Button className="submit-button" variant="success" onClick={props.deleteBlog}>Submit</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
  
export default DeleteModal;