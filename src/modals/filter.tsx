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
          {props.formVisible &&
            <div>
              <Redirect to={`/filter/search?${props.query}` } />
            </div>
          }
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function Filtermodal() {
  const [modalShow, setModalShow] = React.useState(false);
  //choose filter parameter
  const [type, setValue] = useState([1,2]);
  const handleChange = (val:any) => {
    setValue(val);
  }
  //ordertype
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  //subject id
  const [input_subid,setsubid]= useState('');
  //subject name
  const [input_subname,setsubname]= useState('');
  //teacher 
  const [teacher,setteacher]= useState('');
  const [formVisible, setFormVisible] = useState<boolean>(false);
  var [query,setquery]=useState('');

  const click=()=>{

    Submit()
    //window.location.reload(false);
  }
  //about modal
  const showmodal=()=>{
    setModalShow(true);
    
  }
  const Submit=()=>{
    setModalShow(false)
    var querystring:string=''
    var i:number=0;
    var istype=""
    
    if(type.length==2 || type.length==0){
      istype="3"
      querystring+="type="+istype
    }
    else if(type[0]==2){
      istype="2"
      querystring+="type="+istype
    }
    else if(type[0]==1){
      istype="1"
      querystring+="type="+istype
    }
    if(radioValue!=""){
      querystring+="&order="+radioValue.toString()
    }
    if(input_subname!=""){
      querystring+="&subname="+input_subname
    }
    if(input_subid!=""){
      querystring+="&code="+input_subid
    }
    if(teacher!=""){
      querystring+="&teachname="+teacher
    }
    setquery(querystring)
    console.log(querystring)
    reset()
  }
  const reset=()=>{

    setValue([1,2])
    setChecked(false);
    setRadioValue('');
    setsubid('');
    setsubname('');
    setteacher('');
  }
  useEffect(()=>{
    if (query !== ""){
      setFormVisible(!formVisible);
    }
  },[query])
  return (
    <>
      <Button variant="primary" onClick={showmodal}>
        FILTER
      </Button>

      <FilterModal
        show={modalShow}
        onHide={Submit}
        type={type}
        handle_type={handleChange}
        checked={checked}
        setChecked={setChecked}
        radiovalue={radioValue}
        setRadioValue={setRadioValue}
        subjectid={input_subid} 
        setsubid={setsubid}
        subname={input_subname}
        setsubname={setsubname}
        teacher={teacher}
        setteacher={setteacher}
        formVisible={formVisible}
        query={query}
        click={click}
      />
    </>
  );
}
  
export default Filtermodal;