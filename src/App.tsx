import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component/input.css'
import Input_Blogname from './component/Input_Blogname';
import Input_Subject from './component/Input_Subject';
import Input_Coursecode from './component/Input_Coursecode';
import Input_Teachername from './component/Input_Teachername';
import * as yup from "yup";
import Submit_Cancel from './component/Submit_Cancel';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';


const App=()=> {

  const [input,setInput] = useState({
    blogname:'',
    coursecode:'',
    subject:'',
    teacher:''
  })  

  const handleChange = (e:any) => {
    const { target } = e
    const { name } = target
    const value = name ==='term' ? target.checked : target.value
    
    setInput({
      ...input,
      [name]: value
    })
  }

  

  const informationSchema = yup.object().shape({
    blogname: yup.string().required('This field is required.'),
    coursecode: yup.string().required('This field is required.'),
    subject: yup.string().required('This field is required.'),
    teacher: yup.string().required('This field is required.'),
  });
  
  

  return(
    <div className = "bg_color">
      <div className="Blog_Info">
        <Input_Blogname change={handleChange}/>
        <Input_Coursecode change={handleChange}/>
        <Input_Subject coursecode={input.coursecode}/>
        <Input_Teachername change={handleChange}/>
        <Submit_Cancel input={input}/>
      </div>  
    </div>
  )
}

export default App;