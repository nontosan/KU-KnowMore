import React, { useState , Component } from 'react';
import './section.css';
import Photo from './upload';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card'
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript'

import 'bootstrap/dist/css/bootstrap.min.css';


const Section = () => {
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
            <InputGroup className="bigupload" size="lg">
                <Card className="uploadfile">
                    <Photo />
                </Card>
                <InputGroup.Prepend className="textup">
                <Button className="cancel-button" variant="outline-secondary">Upload File</Button>
                </InputGroup.Prepend>
            </InputGroup><br />
            <Button className="cancel-button" variant="outline-secondary">Cancel</Button>
            <Button className="submit-button" variant="outline-secondary">Submit</Button>
        </div>
    );
}

export default Section;
