import React, { useState , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Subjectid(props:any){
    
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text>Subject ID</InputGroup.Text>
                <input value={props.subid} onChange={(e)=>props.setsubid(e.target.value)}/>
                </InputGroup.Prepend>
                
            </InputGroup>
        </div>
    );
}
export default Subjectid