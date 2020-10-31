// IMPORT LIBRARY //
import React, { useState , Component, HtmlHTMLAttributes, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { convertToRaw, EditorState } from 'draft-js';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import Photo from '../upload';
import UploadFile from '../UploadFile';
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

const EditSection = (props:any) => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [editorValue, setEditorValue] = useState("");

    const blogId = (props.match.params.blogId)
    const sectionId = (props.match.params.sectionId);
    const history = useHistory()
    const handleNewSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSectionName(e.target.value);
    };
    
    const handleSectionSave = () => {
        const writeSection = {
            id: sectionId,
            section_name: newSectionName,
            content: editorValue,
            blog_id: blogId,
        };

        SectionService.editSection(sectionId, writeSection)
            .then(savedEditSection => {
                if(savedEditSection){
                    alert("บันทึก Section สำเร็จ");
                }else{
                    alert("บันทึก Section สำเร็จ");
                }
                history.goBack()
            });
            //console.log(history)
            
    };

    const fetchSection = () => {
        SectionService.fetchSectionsSpecific(sectionId)
            .then(sectioninfo => {
                const draftstate = sectioninfo[0].content;
                const markup = draftToHtml(
                    draftstate, 
                );
                setEditorValue(markup);
                const section_name = sectioninfo[0].section_name;
                setNewSectionName(section_name);
            })
    }
    useEffect(() => {
        fetchSection();
    },[])

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
                <Photo />
            </div>
            <div className="uploadtest">
                <UploadFile />
            </div>
            <div className="div-sectionname">
                <Button className="cancel-button" variant="outline-secondary" onClick={e=>history.goBack()}>Cancel</Button>
                <Button className="submit-button" variant="outline-secondary" onClick={handleSectionSave}>Submit</Button>
            </div>
        </div>
    );
}

export default EditSection;
