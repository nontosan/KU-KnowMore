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
import { convertToRaw, EditorState } from 'draft-js';
import { type } from 'os';
import { convertToObject } from 'typescript';


const EditSection = (props:any) => {
    const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
    const [afterFetch, setafterFetch] = useState<boolean>(false);
    const [displayHTML, setDisplayHTML] = useState<any>();
    const sectionId = (props.match.params.sectionId);
    const [stateCheck, setstateCheck] = useState<boolean>(false);
    const [draftedstate, setdraftedState] = useState(EditorState.createEmpty());

    const fetchSection = () => {
        SectionService.fetchSectionsSpecific(sectionId)
            .then(sectioninfo => {
                setSectionsInformation(sectioninfo);
                setstateCheck(true);
            })
    }
    const initdraft = () => {
        const draftstate = sectionsInformation[0].content;
        const drrrr = rawToDraft(JSON.stringify(draftstate));
        console.log(drrrr);
        setdraftedState(drrrr!);
        const markup = draftToHtml(
            draftstate, 
        );
        console.log(markup);
        setDisplayHTML(markup);
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

    useEffect(() => {
        if (draftedstate !== EmptyState){
            //console.log(JSON.stringify(draftstate));
        }
    },[draftedstate])
    //useEffect( () => {
    //    initdraft();
    //    setafterFetch(!afterFetch);
    //},[sectionsInformation])

    return (
        <div>
            <InputGroup size="lg" className="div-sectionname">
                <InputGroup.Prepend >
                    <InputGroup.Text id="inputGroup-sizing-lg">Section Name</InputGroup.Text>
                </InputGroup.Prepend>
            </InputGroup>
            {afterFetch &&
                <div className="div-sectionname" dangerouslySetInnerHTML={{__html: displayHTML}} />
            }
            <div className="div-sectionname">
                <Draft 
                    onEditorStateChange={
                        (draftstate) => {
                            setdraftedState(draftstate);
                            console.log(JSON.stringify(draftstate));
                        }
                    }
                />
            </div>
        </div>
    );
}

export default EditSection;
