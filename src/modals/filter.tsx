import React,{useState,useEffect,useCallback} from "react"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link, Redirect
} from 'react-router-dom'
import ModalFilter from './ModalFilter';

const Filtermodal = () => {
  const [modalShow, setModalShow] = React.useState(false);
  //choose filter parameter
  const [type, setValue] = useState([1,2]);
  const handleChange = (val:any) => {
    console.log(val);
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
  const closeModal = () => {
    setModalShow(false);
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
    <div>
      <Button variant="primary" onClick={showmodal}>
        FILTER
      </Button>

      {modalShow &&
        <div>
          <ModalFilter
            show={modalShow}
            onHide={closeModal}
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
        </div>
      }

      {formVisible &&
        <div>
          <Redirect to={`/filter/search?${query}`} />
        </div>
      }
    </div>
  );
}
  
export default Filtermodal;