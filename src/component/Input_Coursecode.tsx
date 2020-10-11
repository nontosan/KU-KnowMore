import React from 'react';
import './input.css'

function Input_Coursecode(props: { change: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined; }){
    return(
        <div className="Blog_frame2">
            <label className="Blog_name" htmlFor="InputCoursecode">รหัสวิชา</label>
            <input
                className="Blog_name2"
                type="ฺBlogname"
                onChange={props.change}
                name="coursecode"
            />
        </div>
    )
}
    
export default Input_Coursecode;