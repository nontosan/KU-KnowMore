import React from 'react';
import './input.css'

const Input_Nameteacher=(a:any)=>{
    const changeValue=(e:any)=>{
        a.setNameteacher(e.currentTarget.value);
    }
    return(
        <div className="Blog_frame1">
            <div className="Blog_name">
                อาจารย์
            </div>
            <div className="Blog_name2">
                <input type="text" onChange={(e)=>changeValue(e)} value={a.value}/>
            </div>
        </div> 
    )
}
    
export default Input_Nameteacher;