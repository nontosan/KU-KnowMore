import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import { Section_Edit } from '../interfaces/SectionEdit';
import  loadeditsection from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import AddSection from '../photo/addsection.png';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type editsection={
  section:Section_Edit
}

const CreateEditSection = () => {
  const [sections,setsections] = useState<Section_Edit[]>([])

  //function fetch section form database

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

  return (
    <div>
      <div>
        {sections.map(item=>(
          <div>
            <div>hello</div>
            <button onClick={handledeletesection}>edit</button>
            <button onClick={handleeditsection}>delete</button> 
          </div>
        ))}
      </div>
      <div className="div-addsection">
        <Link to="/writesection">
          <Button variant="outline-secondary" className="add button-addsection">
            <Image className="addsection" src={AddSection} roundedCircle />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateEditSection
