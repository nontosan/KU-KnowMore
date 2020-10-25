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
    let i = 0;
    let k = 0;
    let check = 0;
    const [allCourse,setAllCourse] = useState<any[]>([]);
    const codeoption:any[]=[]
    const NameThoption:any[]=[]
    const NameEnoption:any[]=[]
    const Teacheroption:any[]=[]
    const [codeOptions,setCodeOptions] = useState<any[]>([]);
    const [nameThOptions,setNameThOptions] = useState<any[]>([]);
    const [nameEnOptions,setNameEnOptions] = useState<any[]>([]);
    const [teacherOptions,setTeacherOptions] = useState<any[]>([]);
    const [course,setCourse] = useState<Course_real[]>([])
    const code:any[]=[]
    const [selectCode,setSelectCode] =useState<string>('');
    const [selectNameTh, setSelectNameTh] = useState<string>('');
    const [selectNameEn, setSelectNameEn] = useState<string>('');
    const [selectTeacher, setSelectTeacher] = useState<string>('');
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
        console.log((code[0].selectedOption).value);
        setSelectCode((code[0].selectedOption).value);
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
            setAllCourse(res);
            res.forEach((value,index)=>{
                codeoption.push({ value: value.Code, label: value.Code })
                //NameThoption.push({ value: value.NameTh, label: value.NameTh })
                //NameEnoption.push({ value: value.NameEn, label: value.NameEn })
                //Teacheroption.push({ value: value.Teacher, label: value.Teacher })
            })
        })
        setCodeOptions(codeoption);
        //setNameThOptions(NameThoption);
        //setNameEnOptions(NameEnoption);
        //setTeacherOptions(Teacheroption);
        setAvailable(true);
        //setVisible(true)
        //console.log(codeoption);
        //console.log(Teacheroption);
    }
    useEffect(()=>{
        fetchCourse()
    },[])
    useEffect(()=>{
        if (available!==undefined){
            //console.log(teacherOptions);
            setVisible(true);
            //console.log(available);
        }
    },[available])

    useEffect(()=>{
        if(selectCode!==undefined){
            console.log(selectCode);
            console.log("HELLO");
            {allCourse.map(item => {
                if(item.Code==selectCode){
                    if(check == 0){
                        setSelectNameTh(item.NameTh)
                        setSelectNameEn(item.NameEn)
                        check = 1;
                    }
                    Teacheroption.push({ value: item.Teacher, label: item.Teacher })
                }
            })}
            setTeacherOptions(Teacheroption);
        }
    },[selectCode])

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
                            isDisabled
                            placeholder={selectNameTh}
                        />
                    <div>NameEn</div>
                        <Select 
                            isDisabled
                            placeholder={selectNameEn}
                        />

                    <div>Teacher</div>
                        <Select 
                            options = {teacherOptions} 
                            onChange={handleChangeTeacher}
                            isSearchable
                        />
                </div>
            }
        </div>
        
      );
}
      

export default Dropdowntest;



