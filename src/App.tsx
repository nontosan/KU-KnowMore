import React, { useState } from 'react';
import Confirm from './confirm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input_Nameblog from './component/input_nameblog';
import Input_Idclass from './component/input_idclass';
import Input_Nameclass from './component/input_nameclass';
import Input_Nameteacher from './component/input_nameteacher';

const App=()=> {
  const [Nameblog, setNameblog]=useState("");
  const [Nameteacher, setNameteacher]=useState("");
  const call=()=>{
    alert(Nameblog)
    alert(Nameteacher)
  }
  return (
    <div className="Blog_Info">
      <button onClick={call}>
        check
      </button>
      <Input_Nameblog setNameblog={setNameblog} />
      <Input_Idclass />
      <Input_Nameclass />
      <Input_Nameteacher setNameteacher={setNameteacher}/> 
      <Confirm /> 
    </div>

  );
}

export default App;