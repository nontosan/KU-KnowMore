import React from 'react';
import './input.css'

function Input_Teachername(props: { change: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined; }){
    return(
        <div className="Blog_frame1">
            <label className="Blog_name" htmlFor="InputTeahcername">อาจารย์</label>
            <input
                className="Blog_name2"
                type="ฺBlogname"
                onChange={props.change}
                name="teacher"
            />
        </div> 
    )
}
    
export default Input_Teachername;