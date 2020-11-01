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
import Demo from '../UploadTest';
import UploadMultiEditSection from "../uploadfile/UploadMultiEditSection"
import DisplayFileandDel from '../DisandDel';
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
import 'antd/dist/antd.css';
import { notification,message } from 'antd';
import '../file.css';

const key = 'updatable';

const EditSection = (props:any) => {
    const [newSectionName, setNewSectionName] = useState<string>('');
    const [editorValue, setEditorValue] = useState("");

    const blogId = (props.match.params.blogId)
    const sectionId = (props.match.params.sectionId);
    const history = useHistory()
    const handleNewSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSectionName(e.target.value);
    };
    /////////////////antd//////////////////////////
    const openMessage = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
          message.success({ content: 'already edit section', key, duration: 2 });
        }, 200);
      };

    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary"  onClick={() => {
            notification.close(key)
            history.goBack()
          }}>
            Confirm
          </Button>
        );
        notification.open({
          message: 'Notification',
          description:
            'Would you like to discard edit section',
          btn,
          key,
          onClose: close,
        });
    };
    const close = () => {
        console.log(
          'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
      };
    //////////////////antd end///////////////
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
                    openMessage()
                }else{
                    alert("บันทึก Section สำเร็จ");
                }
                history.goBack()
            });
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
            <div className="uploadtest">
                <UploadMultiEditSection secid = {sectionId}/>
            </div>
            <div className="display">
                <h4>File: </h4>
            <DisplayFileandDel secid = {sectionId} fetchsection={fetchSection}/>
            </div>
            <div className="div-sectionname">
                <Button className="cancel-button" variant="outline-danger" onClick={e=>openNotification()}>Cancel</Button>
                <Button className="submit-button" variant="outline-success" onClick={handleSectionSave}>Submit</Button>
            </div>
        </div>
    );
}

export default EditSection;
