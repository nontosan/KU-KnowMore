import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';

import {
  Link, Redirect,
} from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik"


const EditBlogContent_formik=(props:any)=> {
  
  const [Nameblog, setNameblog]=useState<string>(props.blog_name);
  const [IDclass, setIDclass]=useState<string>(props.course_id);
  const [Subjectname, setNameclass]=useState<string>("ethic&life");
  const [Teachername, setNameteacher]=useState<string>("jernjern");
  const [visibleEdit,setVisibleEdit] = useState<boolean>(false)

  


  useEffect(() => {
    
  },[]);

  return (
    <div>
        <Formik
            initialValues={{nameblog:props.blog_name,iDclass:props.course_id,subjectname:Subjectname,teachername:Teachername}}
            validate={value=>{
                if(value.nameblog!==Nameblog || value.iDclass!==IDclass || value.subjectname!==Subjectname || value.teachername!==Teachername){
                    setVisibleEdit(true)
                }
            }}
            onSubmit={(values,actions)=>{
                console.log(values)
            }}
        >
            {({isSubmitting})=>(
                <Form>
                    <div className="Blog_frame1">
                        <div className="Blog_name">ชื่อบล็อค</div>
                        <div className="Blog_name2">
                            <Field type="input" name="nameblog"/>
                        </div>
                    </div>
                    <div className="Blog_frame2">
                        <div className="Blog_name">รหัสวิชา</div>
                        <div className="Blog_name2">
                            <Field type="input" name="iDclass"/>
                        </div>
                    </div>
                    <div className="Blog_frame2">
                        <div className="Blog_name">ชื่อวิชา</div>
                        <div className="Blog_name3">
                            <Field type="input" name="subjectname"/>
                        </div>
                        </div>
                    <div className="Blog_frame1">
                        <div className="Blog_name">อาจารย์</div>
                        <div className="Blog_name2">
                            <Field type="input" name="teachername"/>
                        </div>
                    </div> 
                    {visibleEdit &&
                        <button disabled={isSubmitting}> Edit </button>
                    }
                </Form>
            )}
        </Formik>
    </div>

  );
}
export default EditBlogContent_formik;