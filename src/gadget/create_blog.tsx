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
import '../App.css';
//------------------------------------------------------------------//
const options = [
    { value: '0123', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra' ,label: 'Orchestra' } 
  ];

const Dropdowntest=()=> {
    const resultLimit = 10
    let i = 0
    const codeoption:any[]=[]
    const [codeOptions,setCodeOptions] = useState<any[]>([]);
    const NameThoption:any[]=[]
    const [nameThOptions,setNameThOptions] = useState<any[]>([]);
    const NameEnoption:any[]=[]
    const [nameEnOptions,setNameEnOptions] = useState<any[]>([]);
    const Teacheroption:any[]=[]
    const [teacherOptions,setTeacherOptions] = useState<any[]>([]);
    const [course,setCourse] = useState<Course_real[]>([])
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<any[]>([]);
    const [NameTh,setNameTh] =useState({})
    const [NameEn,setNameEn] =useState({})
    const [Teacher,setTeacher] =useState({})
    const [visible,setVisible] = useState<boolean>(false)
    const [available,setAvailable] = useState<boolean>(false)
//    const resetvalue=()=>{
//        const codeoption=[{}]
//        const NameThoption=[{}]
//        const NameEnoption=[{}]
//        const Teacheroption=[{}]
//            
//    }
    const handleChangeCode = (selectedOption:any) => {
        code.push({ selectedOption })
        console.log(code[0].selectedOption);
        setSelectCode(code[0].selectedOption);
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
            //console.log(res);
            res.forEach((value,index)=>{
                codeoption.push({ value: value.Code, label: value.Code })
                NameThoption.push({ value: value.Code, label: value.NameTh })
                NameEnoption.push({ value: value.Code, label: value.NameEn})
                Teacheroption.push({ value: value.Code, label: value.Teacher })
            })
        })
        setCodeOptions(codeoption);
        setNameThOptions(NameThoption);
        setNameEnOptions(NameEnoption);
        setTeacherOptions(Teacheroption);
        setAvailable(true);
        //setVisible(true)
        //console.log(codeoption);
        console.log(options);
    }
    useEffect(()=>{
        fetchCourse()
    },[])

    useEffect(()=>{
        if (available!==false){
            setVisible(true);
            console.log(available);
            console.log(nameThOptions[0].value);
        }
    },[available])
    //console.log(codesOption);
    return (
        <div className="hot-kl">
            {visible &&
            <div>
                <div>mee data</div>
                {codeoption[0]}
                <div>code</div>
                    <Select 
                        options = {codeOptions} 
                        onChange={handleChangeCode}
                        isSearchable
                        filterOption={({label}, query) => label.indexOf(query.toLowerCase()) >= 0 && i++ < resultLimit}
                        onInputChange={() => { i = 0 }}
                    />
                <div>NameTh</div>
                    <Select 
                        options = {nameThOptions} 
                        onChange={handleChangeNameTh}
                        isSearchable
                    />
                <div>NameEn</div>
                    <Select 
                        options = {nameEnOptions} 
                        onChange={handleChangeNameEn}
                        isSearchable
                    />

                <div>Teacher</div>
                    <Select 
                        options = {options} 
                        onChange={handleChangeTeacher}
                        isSearchable
                    />
            </div>
            }
        </div>
        
      );
}
      

export default Dropdowntest;



