// IMPORT LIBRARY //
import React, { useState , Component, HtmlHTMLAttributes } from 'react';
import Button from 'react-bootstrap/Button';
import { convertToRaw, EditorState } from 'draft-js';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import Photo from '../upload';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import SectionService from '../../services/SectionService';
// END OF IMPORT SERVICE //

// IMPORT CSS //
import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { convertToObject } from 'typescript';
import { reverse } from 'dns';
import {useHistory, Redirect} from "react-router"

const WriteSection = (props:any) => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [draftstate, setdraftState] = useState(EditorState.createEmpty());

    const blogId = (props.match.params.blogId)
    const history = useHistory()
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
                console.log("save success")
            });
            //console.log(history)
            history.goBack()
    };

    console.log(history.go)
    const rawContentState = convertToRaw(draftstate.getCurrentContent());
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
                            //console.log(draftstate.getCurrentContent());
                        }
                    }
                />
            </div>
            <div className="div-sectionname">
                <Photo />
            </div>
            <div className="div-sectionname">
                <Button className="cancel-button" variant="outline-secondary" onClick={e=>history.goBack()}>Cancel</Button>
                <Button className="submit-button" variant="outline-secondary" onClick={handleSectionSave}>Submit</Button>
            </div>
        </div>
    );
}

export default WriteSection;
