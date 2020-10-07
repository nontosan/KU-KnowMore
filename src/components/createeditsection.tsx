import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Section_Edit } from '../interfaces/SectionEdit';
import  loadeditsection from "../services/loadeditsection"

type editsection={
  section:Section_Edit
}

const CreateEditSection = () => {
  const [sections,setsections] = useState<Section_Edit[]>([])

  //function fetch section form database
  const fetchSection=()=>{
    loadeditsection.fetchsection().then(sections =>{setsections(sections)})
  }  

  //function handlesection  
  const handledeletesection=()=>{
    fetch("api_path for delete section",{
      method:"Post",
      headers:{'Content-Type':'appllication/json'},
      body:JSON.stringify(sections)
    }).then(res=>res.json())
  }
  //function handle edit section
  const handleeditsection=()=>{
    console.log("create route to create section")
  }
  const handleaddsection=()=>{
    console.log("addsection")
  }
  //fetch data every time refreh
  useEffect(()=>{
    fetchSection()
  },[]);

  return (
    <div>
      {sections.map(item=>(
        <div>
          <div>hello</div>
          <button onClick={handledeletesection}>edit</button>
          <button onClick={handleeditsection}>delete</button> 
        </div>
      ))}
      <div>
        <button onClick={handleaddsection}>addsection</button>
      </div>
    </div>
  );
};

export default CreateEditSection
