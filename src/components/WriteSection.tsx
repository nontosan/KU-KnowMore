import React, { useState , Component } from 'react';
import './section.css';
import Photo from './upload';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import 'bootstrap/dist/css/bootstrap.min.css';


const WriteSection = () => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [draftstate, setdraftState] = useState<typeof EmptyState>();

    const handleNewSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSectionName(e.target.value);
    };
    
    return (
        <div>
            <InputGroup size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">Section name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={newSectionName} onChange={handleNewSectionNameChange}/>
            </InputGroup><br />
            <Draft 
                onEditorStateChange={(editorState) => {setdraftState(draftstate);}}
            /><br />
            <Photo /><br />
            <Button className="cancel-button" variant="outline-secondary">Cancel</Button>
            <Button className="submit-button" variant="outline-secondary">Submit</Button>
        </div>
    );
}

export default WriteSection;
