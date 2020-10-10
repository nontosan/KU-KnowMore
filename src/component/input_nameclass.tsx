import React from 'react';
import './input.css'

const Input_Nameclass = (a:any) =>
{
    const changeValue = (e:any) => 
    {
        a.setNameclass(e.currentTarget.value);
    }
    return(
        <div className="Blog_frame2">
            <div className="Blog_name">
                ชื่อวิชา
            </div>
            <div className="Blog_name3">
                <input type="text" onChange={(e)=>changeValue(e)}/>
            </div>
        </div>
    )
}
    
export default Input_Nameclass;