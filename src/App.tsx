import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Input_Nameblog from './component/input_nameblog';
import Input_Idclass from './component/input_idclass';
import Input_Nameclass from './component/input_nameclass';
import Input_Nameteacher from './component/input_nameteacher';
import Confirm from './component/confirm';


const App=()=> {
  const [Nameblog, setNameblog]=useState("");
  const [Nameteacher, setNameteacher]=useState("");
  const [IDclass, setIDclass]=useState("");
  const [Nameclass, setNameclass]=useState("");
  const call=()=>{
    alert(Nameblog)
    alert(IDclass)
    alert(Nameclass)
    alert(Nameteacher)
  }
  
  return (
    <div className="bg_color">
     <div className="Blog_Info">
        <button onClick={call}>
         check
        </button>
      <Input_Nameblog setNameblog={setNameblog} />
      <Input_Idclass setIDclass={setIDclass} />
      <Input_Nameclass setNameclass={setNameclass} />
      <Input_Nameteacher setNameteacher={setNameteacher} />
      <Confirm />
    </div>
    </div>

  );
}

export default App;