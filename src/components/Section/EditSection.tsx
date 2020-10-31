// IMPORT LIBRARY //
import React, { useState , useEffect , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
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
    const [editorValue, setEditorValue] = useState("");

    const sectionId = (props.match.params.sectionId);
    
    const fetchSection = () => {
        SectionService.fetchSectionsSpecific(sectionId)
            .then(sectioninfo => {
                setSectionsInformation(sectioninfo);
                setstateCheck(true);
            })
    }
    const initdraft = () => {
        const editor_state : string = sectionsInformation[0].content;
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
