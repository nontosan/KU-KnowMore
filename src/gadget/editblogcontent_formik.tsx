import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';

import {
  Link, Redirect,
} from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik"
import Dropdowntest from './create_blog';


const EditBlogContent_formik=(props:any)=> {
   useEffect(() => {
    
  },[]);

  return (
    <div>
        <Dropdowntest />
    </div>

  );
}
export default EditBlogContent_formik;