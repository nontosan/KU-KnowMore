import React,{useState,useEffect,useCallback} from "react"
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Choosefilter from "../gadget/choosefilter"
import Order from "../gadget/order"
import Subjectname from "../gadget/Subjectname";
import Subjectid from "../gadget/Subjectid";
import Teacher from "../gadget/teacher"
function FilterModal(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          FILTER BLOGS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <div>
          <div>Choose Blog type </div>
          <Choosefilter />
          <Order />
          <Subjectname />
          <Subjectid />
          <Teacher />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Filtermodal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <FilterModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
  
export default Filtermodal;