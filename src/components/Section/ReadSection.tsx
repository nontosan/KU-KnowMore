import React, { useState , Component } from 'react';
import Photo from '../upload';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import SectionService from '../../services/SectionService';

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ReadSection = (props:any) => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [draftstate, setdraftState] = useState<typeof EmptyState>();

    const blogId = (props.match.params.blogId)

    const handleNewSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSectionName(e.target.value);
    };

    return (
        <div>
            <InputGroup size="lg" className="div-sectionname">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-lg">Section Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={newSectionName} onChange={handleNewSectionNameChange}/>
            </InputGroup>
            <div className="div-sectionname">
                <Draft 
                    onEditorStateChange={(editorState) => {setdraftState(draftstate);}}
                />
            </div>
            <div className="div-sectionname">
                <Photo />
            </div>
        </div>
    );
}

export default ReadSection;
