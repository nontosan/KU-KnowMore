import React from 'react';
import './input.css'

const Input_Nameblog=(a:any)=>{
    const changeValue=(e:any)=>{
        a.setNameblog(e.currentTarget.value);
    }
    return(
        <div className="Blog_frame1">
                <div className="Blog_name">
                    ชื่อบล็อค 
                </div>
                <div className="Blog_name2">
                    <input type="text" onChange={(e)=>changeValue(e)}/>
                </div>
        
        </div>
    )
}
    
export default Input_Nameblog;