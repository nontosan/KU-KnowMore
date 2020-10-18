import React, { useState , useEffect , Component } from 'react';
import Photo from '../upload';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import SectionService from '../../services/SectionService';

import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Section } from '../../interfaces';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { type } from 'os';
import { convertToObject } from 'typescript';
import DraftEditor from './DraftEditor';

const EditSection = (props:any) => {
    const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
    const [afterFetch, setafterFetch] = useState<boolean>(false);
    const [stateCheck, setstateCheck] = useState<boolean>(false);
    const [stateContentCheck, setStateContentCheck] = useState<boolean>(false);
    const [content, setContent] = useState<ContentState>();
    //const [draftstate, setdraftState] = useState(EditorState.createWithContent(content!));

    const sectionId = (props.match.params.sectionId);
    
    const fetchSection = () => {
        SectionService.fetchSectionsSpecific(sectionId)
            .then(sectioninfo => {
                setSectionsInformation(sectioninfo);
                setstateCheck(true);
            })
    }
    const initdraft = () => {
        const qdraftstate = sectionsInformation[0].content;
        const ddd = convertFromRaw(qdraftstate);
        setContent(ddd);
        setStateContentCheck(true);
    }
    
    useEffect(() => {
        fetchSection();
    },[])

    useEffect(() => {
        if (stateCheck !== false){
            initdraft();
        }
    },[stateCheck])

    useEffect(() => {
        if(stateContentCheck !== false){
            setafterFetch(!afterFetch);
        }
    },[stateContentCheck])

    //console.log(JSON.stringify(content));
    //useEffect(() => {
    //    if (draftstate !== EmptyState){
    //        //console.log(JSON.stringify(draftstate));
    //    }
    //},[draftstate])
    //useEffect( () => {
    //    initdraft();
    //    setafterFetch(!afterFetch);
    //},[sectionsInformation])
//
    return (
        <div>
            <InputGroup size="lg" className="div-sectionname">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-lg">Section Name</InputGroup.Text>
                </InputGroup.Prepend>
            </InputGroup>
            {afterFetch &&
                <div className="div-sectionname">
                    HELLOTESTEST
                    <DraftEditor cont={content}/>
                </div>
            }
            
        </div>
    );
}

export default EditSection;
