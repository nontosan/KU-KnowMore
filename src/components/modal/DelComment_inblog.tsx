import React,{useState,useEffect,useCallback} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


const DeleteCommentModal = (props:any) => {
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
          DELETE THIS COMMENT?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        CONTENT : {props.content}
        {props.show}
      </Modal.Body>
      <Modal.Footer>
        <div className="Cancel">
          <Button className="cancel-button" variant="danger" onClick={props.cancel}>Cancel</Button>
        </div>
        <div className="Submit">
          <Button className="submit-button" variant="success" onClick={props.deleteComment}>Submit</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
  
export default DeleteCommentModal;