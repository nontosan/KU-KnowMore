import React, { useState , Component, HtmlHTMLAttributes } from 'react';
import Photo from '../upload';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import SectionService from '../../services/SectionService';

import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { convertToRaw, EditorState } from 'draft-js';


const WriteSection = (props:any) => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [draftstate, setdraftState] = useState(EditorState.createEmpty());

    const blogId = (props.match.params.blogId)

    const handleNewSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSectionName(e.target.value);
    };
    
    const handleSectionSave = () => {
        const writeSection = {
            section_name: newSectionName,
            content: rawContentState,
            blog_id: blogId,
        };

        SectionService.createSection(blogId, writeSection)
            .then(savedWriteSection => {
                if (savedWriteSection !== null) {
                    console.log(savedWriteSection);
                    alert("Save Success");
                } else{
                    alert("Save Error");
                }
            });
    };


    const rawContentState = convertToRaw(draftstate.getCurrentContent());

    const markup = draftToHtml(
        rawContentState, 
      );

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
                    onEditorStateChange={
                        (draftstate) => {
                            setdraftState(draftstate);
                            console.log(draftstate);
                            console.log(typeof(draftstate));
                        }
                    }
                />
            </div>
            <div dangerouslySetInnerHTML={{__html: markup}} />
            <div className="div-sectionname">
                <Photo />
            </div>
            <div className="div-sectionname">
                <Button className="cancel-button" variant="outline-secondary">Cancel</Button>
                <Button className="submit-button" variant="outline-secondary" onClick={handleSectionSave}>Submit</Button>
            </div>
        </div>
    );
}

export default WriteSection;
