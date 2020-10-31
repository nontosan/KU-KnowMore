// IMPORT LIBRARY //
import React, { useState , useEffect , Component } from 'react';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import InputGroup from 'react-bootstrap/InputGroup';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DraftEditor from './DraftEditor';
import UploadMulFile from '../UploadMulFile';
import DisplayFile from '../DisplayFile';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import SectionService from '../../services/SectionService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Section } from '../../interfaces';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const EditSection = (props:any) => {
    const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
    const [afterFetch, setafterFetch] = useState<boolean>(false);
    const [stateCheck, setstateCheck] = useState<boolean>(false);
    const [stateContentCheck, setStateContentCheck] = useState<boolean>(false);
    const [content, setContent] = useState<ContentState>();
    const [editorValue, setEditorValue] = useState("");
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
                    <ReactQuill 
                        placeholder={"เขียนรีวิวลงที่นี้"}
                        theme="snow" 
                        value={editorValue} 
                        onChange={setEditorValue}
                    />
                </div>
            }
            <div className='Upload'>
                <UploadMulFile />
            </div>
            <div className='Edit'>
                <DisplayFile />
            </div>
        </div>
    );
}

export default EditSection;
