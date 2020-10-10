import React, { useState , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Subjectname(props:any){
    
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text>Subject name</InputGroup.Text>
                </InputGroup.Prepend>
                <input value={props.subname} onChange={(e)=>props.setsubname(e.target.value)}/>
            </InputGroup>
        </div>
    );
}
export default Subjectname