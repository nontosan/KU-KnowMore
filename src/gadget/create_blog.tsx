// IMPORT LIBRARY //
import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';



import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';
import CourseService from "../services/CourseService"
import {
  Link, Redirect,
} from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik"
import { Course, Course_real } from '../interfaces/course';

//------------------------------------------------------------------//
const options = [
    { value: 'blues', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra' ,label: 'Orchestra' } 
  ];

const Dropdowntest=()=> {
    const [codeoption,setCodeopt] = useState<[{value:string,label:string}]>([{value:"test",label:"test"}])
    const [NameThoption,setNameThopt]=useState<[{value:string,label:string}]>([{value:"test",label:"test"}])
    const [NameEnoption,setNameEnopt]=useState<[{value:string,label:string}]>([{value:"test",label:"test"}])
    const [Teacheroption,setTeacheropt]=useState<[{value:string,label:string}]>([{value:"test",label:"test"}])
    const [course,setCourse] = useState<Course_real[]>([])
    const [code,setCode] =useState({})
    const [NameTh,setNameTh] =useState({})
    const [NameEn,setNameEn] =useState({})
    const [Teacher,setTeacher] =useState({})
    const [visible,setVisible] = useState<boolean>(false)
    const resetvalue=()=>{
        const codeoption=[{}]
        const NameThoption=[{}]
        const NameEnoption=[{}]
        const Teacheroption=[{}]
            
    }
    const handleChangeCode = (selectedOption:any) => {
        setCode({ selectedOption });
    }
    const handleChangeNameTh = (selectedOption:any) => {
        setNameTh({ selectedOption });
    }
    const handleChangeNameEn = (selectedOption:any) => {
        setNameEn({ selectedOption });

    }
    const handleChangeTeacher = (selectedOption:any) => {
        setTeacher({ selectedOption });
    }
    

    const fetchCourse =async()=>{
        const x = await CourseService.fetchCourse().then(res=>{
            setCourse(res)
            res.forEach((value,index)=>{
                //codeoption.push({ value: value.Code, label: value.Code })
                //NameThoption.push({ value: value.NameTh, label: value.NameTh })
                //NameEnoption.push({ value: value.NameEn, label: value.NameEn})
                //Teacheroption.push({ value: value.Teacher, label: value.Teacher })
               
            })
        })
        //setVisible(true)
        console.log(codeoption)
        setVisible(true)
    }
    useEffect(()=>{
        if(codeoption.length==1){
            fetchCourse()
        }
    },[])
    return (
        <div>
            {codeoption &&
            <div>
                <div>mee data</div>
            
                <div>code</div>
                    <Select 
                        options = {options} 
                        onChange={handleChangeCode}
                        isSearchable
                    />
                <div>NameTh</div>
                    <Select 
                        options = {NameThoption} 
                        onChange={handleChangeNameTh}
                        isSearchable
                    />
                <div>NameEn</div>
                    <Select 
                        optidisons = {NameEnoption} 
                        onChange={handleChangeNameEn}
                        isSearchable
                    />

                <div>Teacher</div>
                    <Select 
                        options = {Teacheroption} 
                        onChange={handleChangeTeacher}
                        isSearchable
                    />
            </div>
            }
        </div>
        
      );
}
      

export default Dropdowntest;



