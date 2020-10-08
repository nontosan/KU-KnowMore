import React from 'react';
import Confirm from './confirm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input_Nameblog from './component/input_nameblog';
import Input_Idclass from './component/input_idclass';
import Input_Nameclass from './component/input_nameclass';
import Input_Nameteacher from './component/input_nameteacher';

function App() {
  return (
    <div className="Blog_Info">
        <Input_Nameblog />
        <Input_Idclass />
        <Input_Nameclass />
        <Input_Nameteacher /> 
        <Confirm /> 
    </div>

  );
}

export default App;