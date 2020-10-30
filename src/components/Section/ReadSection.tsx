// IMPORT LIBRARY //
import React, { useState , useEffect , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { draftToHtml } from 'react-wysiwyg-typescript';
import axios from 'axios';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DisplayFile from '../DisplayFile';

// IMPORT SERVICE //
import SectionService from '../../services/SectionService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Section } from '../../interfaces';
import { Attachments } from '../../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { convertToRaw, EditorState } from 'draft-js';
import { type } from 'os';
import { convertToObject } from 'typescript';
import { useLocation,useHistory } from 'react-router';
import { Link } from 'react-router-dom';

//------------------------------------------------------------------//

const ReadSection = (props:any) => {
    const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
    const [afterFetch, setafterFetch] = useState<boolean>(false);
    const [displayHTML, setDisplayHTML] = useState<any>();
    const sectionId = (props.match.params.sectionId);
    const [stateCheck, setstateCheck] = useState<boolean>(false);
    const [attachmentsInformation, setattachmentsInformation] = useState<Attachments[]>([]);
    const blogId = window.location.pathname.split("/")[2]
    const location=useLocation();
    const history=useHistory()
    const [sectionName, setSectionName] = useState<string>("");
    console.log(sectionId)

    const fetchSection = () => {
        SectionService.fetchSectionsSpecific(sectionId)
            .then(sectioninfo => {
                setSectionsInformation(sectioninfo);
                setstateCheck(true);
            })
    }
    const initdraft = () => {
        const draftstate = sectionsInformation[0].content;
        const markup = draftToHtml(
            draftstate, 
        );
        //console.log(markup);
        setDisplayHTML(markup);
        setSectionName(sectionsInformation[0].section_name);
    }
    
    useEffect(() => {
        fetchSection();
    },[])
    useEffect(() => {
        if (stateCheck !== false){
            initdraft();
            setafterFetch(!afterFetch);
        }
    },[stateCheck])
    //useEffect( () => {
    //    initdraft();
    //    setafterFetch(!afterFetch);
    //},[sectionsInformation])

    return (
        <div>
            <InputGroup size="lg" className="div-sectionname">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-lg">Section Name</InputGroup.Text>
                    <InputGroup.Text id="inputGroup-sizing-lg">{sectionName}</InputGroup.Text>
                </InputGroup.Prepend>
            </InputGroup>
            {afterFetch &&
                <div className="div-sectionname" dangerouslySetInnerHTML={{__html: displayHTML}} />
            }
            <button onClick={e=>history.goBack()}>back</button>
            File :
            <DisplayFile secid = {sectionId}/>
        </div>
    );
}
export default ReadSection;
