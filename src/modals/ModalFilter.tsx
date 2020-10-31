import React,{useState,useEffect,useCallback} from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Choosefilter from "../gadget/filter_gadget/klorrwfilter";
import Order from "../gadget/filter_gadget/order";
import Subjectname from "../gadget/filter_gadget/Subjectname";
import Subjectid from "../gadget/filter_gadget/Subjectid";
import Teacher from "../gadget/filter_gadget/teacher";

const ModalFilter = (props:any) => {
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
                    <Choosefilter type={props.type} handle={props.handle_type} />
                    <Order checked={props.checked} setChecked={props.setChecked} radioValue={props.radioValue} setRadioValue={props.setRadioValue}/>
                    <Subjectname subname={props.subname} setsubname={props.setsubname}/>
                    <Subjectid subid={props.subjectid} setsubid={props.setsubid}/>
                    <Teacher teacher={props.teacher} setteacher={props.setteacher}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button onClick={props.click}>Submit</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalFilter;