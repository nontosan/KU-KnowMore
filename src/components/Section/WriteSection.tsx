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
import UploadFile from '../UploadFile';
import Demo from '../UploadTest';
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
import ReactQuill from 'react-quill';

const WriteSection = (props:any) => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [editorValue, setEditorValue] = useState("");

    const blogId = (props.match.params.blogId)
    const history = useHistory()
    const handleNewSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSectionName(e.target.value);
    };
    
    const handleSectionSave = () => {
        if(newSectionName !=="" && editorValue!==""){
            const writeSection = {
                section_name: newSectionName,
                content: editorValue,
                blog_id: blogId,
            };
    
            SectionService.createSection(blogId, writeSection)
                .then(savedWriteSection => {
                    console.log("save success")
                    console.log(savedWriteSection)
                    window.location.replace(`http://localhost:3000/editSection/${savedWriteSection?.id}`)
                });
                //console.log(history)    
                console.log("already create section")
        }
        else{
            alert("Please fille section name and content")
        }
            
    };

    console.log(history.go)
    return (
        <div>
            <InputGroup size="lg" className="div-sectionname">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-lg">Section Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={newSectionName} onChange={handleNewSectionNameChange}/>
            </InputGroup>
            <div className="div-sectionname">
                <ReactQuill 
                    placeholder={"เขียนรีวิวลงที่นี้"}
                    theme="snow" 
                    value={editorValue} 
                    onChange={setEditorValue}
                />
            </div>
            <div className="div-sectionname">
                <Button className="cancel-button" variant="outline-danger" onClick={e=>history.goBack()}>Cancel</Button>
                <Button className="submit-button" variant="outline-success" onClick={handleSectionSave}>Submit</Button>
            </div>
        </div>
    );
}

export default WriteSection;
