import React, { useState , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Subjectname(){
    const [input,setinput]= useState('');
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text>Subject name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>
        </div>
    );
}
export default Subjectname