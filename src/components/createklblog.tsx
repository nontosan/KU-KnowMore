import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Input_Nameblog from './createblog_component/input_nameblog';
import Input_Idclass from './createblog_component/input_idclass';
import Input_Nameclass from './createblog_component/input_nameclass';
import Input_Nameteacher from './createblog_component/input_nameteacher';
import Confirm from './createblog_component/confirm';


const CreateKlBlog=()=> {
  const [Nameblog, setNameblog]=useState("");
  const [Nameteacher, setNameteacher]=useState("");
  const [IDclass, setIDclass]=useState("");
  const [Nameclass, setNameclass]=useState("");
  
  return (
    <div className="bg_color">
      <div>Create Knowledge Blog</div>
     <div className="Blog_Info">
      <Input_Nameblog setNameblog={setNameblog} />
      <Input_Idclass setIDclass={setIDclass} />
      <Input_Nameclass setNameclass={setNameclass} />
      <Input_Nameteacher setNameteacher={setNameteacher} />
      <Confirm />
    </div>
    </div>

  );
}
export default CreateKlBlog