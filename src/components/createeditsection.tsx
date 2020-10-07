import React, { useEffect, useImperativeHandle } from 'react'
import { Section_Edit } from '../interfaces/SectionEdit';

type editsection={
  section:Section_Edit
}

const CreateEditSection = (props:editsection) => {
  const sections: Section_Edit=props.section;
    const handledeletesection=()=>{
      fetch("api_path for delete section",{
        method:"Post",
        headers:{'Content-Type':'appllication/json'},
        body:JSON.stringify(sections)
      }).then(res=>res.json())
    }

    const handleeditsection=()=>{
      console.log("create route to create section")
    }
    
    return (
      <div>
        <div>{sections.name}</div>
        <button id={sections.id} onClick={handledeletesection}>edit</button>
        <button onClick={handleeditsection}>delete</button>
      </div>
    );
};

export default CreateEditSection
