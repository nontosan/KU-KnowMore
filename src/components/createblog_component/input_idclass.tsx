import React from 'react';
import './input.css'
import { propTypes } from 'react-bootstrap/esm/Image';

const Input_Idclass=(a:any)=>{
    const changeValue=(e:any)=>{
        a.setIDclass(e.currentTarget.value);
    }
    return(
        <div className="Blog_frame2">
            <div className="Blog_name">
                รหัสวิชา
            </div>
            <div className="Blog_name2">
                <input type="text " onChange={(e)=>changeValue(e)} value={a.value}/>
            </div>
        </div>
    )
}
    
export default Input_Idclass;