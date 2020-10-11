import React from 'react';
import './input.css'

function Input_nameblog(props: { change: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined; }){
    return(
        <div className="Blog_frame1">
            <label className="Blog_name" htmlFor="InputBlogname">ชื่อบล็อก</label>
            <input
                className="Blog_name2"
                type="ฺBlogname"
                onChange={props.change}
                name="blogname"
            />
        </div>
    )
}
    
export default Input_nameblog;