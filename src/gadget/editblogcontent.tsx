import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Blog, } from '../interfaces/blog';

import Input_Nameblog from '../components/createblog_component/input_nameblog';
import Input_Idclass from '../components/createblog_component/input_idclass';
import Input_Nameclass from '../components/createblog_component/input_nameclass';
import Input_Nameteacher from '../components/createblog_component/input_nameteacher';
import Confirm from '../components/createblog_component/confirm';
import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';

import {
  Link, Redirect,
} from 'react-router-dom';

import BlogsService from '../services/BlogsService';

const EditBlogContent=(props:any)=> {
  
  const [Nameblog, setNameblog]=useState(props.blog.Blog_name);
  const [IDclass, setIDclass]=useState(props.blog.course_id);
  const [subjectname, setNameclass]=useState("");
  const [teachername, setNameteacher]=useState("");
  const [visibleEdit,setVisibleEdit] = useState<boolean>(false)

  
  const changeBlogName=(a:string)=>{
    setNameblog(a)
    if(Nameblog!=null){
      setVisibleEdit(true)
    }
    else{
      setVisibleEdit(false)
    }
  }
  const changeClassId=(a:string)=>{
    setIDclass(a)
    if(Nameblog!=null){
      setVisibleEdit(true)
    }
    else{
      setVisibleEdit(false)
    }
  }
  const changeClassName=(a:string)=>{
    setNameclass(a)
    if(Nameblog!=null){
      setVisibleEdit(true)
    }
    else{
      setVisibleEdit(false)
    }
  }
  const changeTeacherName=(a:string)=>{
    setNameteacher(a)
    if(Nameblog!=null){
      setVisibleEdit(true)
    }
    else{
      setVisibleEdit(false)
    }
  }
  const handleEdit = () => {
    console.log("edit")
  };

  useEffect(() => {
    
  },[]);

  return (
    <div className="bg_color">
      <div>Create Knowledge Blog</div>
     <div className="Blog_Info">
     <div className="Blog_frame1">
        <div className="Blog_name">
                    ชื่อบล็อค 
        </div>
        <div className="Blog_name2">
          <input type="text"  value={Nameblog}  onChange={(e:any)=>changeBlogName(e)}/>
        </div>
      </div>
      <div className="Blog_frame2">
        <div className="Blog_name">
                ชื่อวิชา
        </div>
        <div className="Blog_name2">
          <input type="text "  onChange={(e:any)=>changeClassName(e)}/>
        </div>
      </div>
      <div className="Blog_frame2">
            <div className="Blog_name">
                ชื่อวิชา
            </div>
            <div className="Blog_name3">
                <input type="text" onChange={(e:any)=>changeClassId(e)}/>
            </div>
        </div>
        <div className="Blog_frame1">
            <div className="Blog_name">
                อาจารย์
            </div>
            <div className="Blog_name2">
                <input type="text" onChange={(e:any)=>changeTeacherName(e)}/>
            </div>
        </div> 
      <div className="Confirm"> 
        {visibleEdit &&
          <div className="Submit">
            <Button variant="success" onClick={handleEdit}> Submit </Button>
          </div> 
        }
      </div>
    </div>
    </div>

  );
}
export default EditBlogContent;