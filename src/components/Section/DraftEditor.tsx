import React, { useState , useEffect , Component } from 'react';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';


const DraftEditor = (props:any) => {
    const [draftedstate, setdraftedState] = useState(EditorState.createWithContent(props.cont!));
    console.log(JSON.stringify(props.cont));
    console.log(JSON.stringify(draftedstate.getCurrentContent()));
    
    return (
        <div>
            <Draft 
                onEditorStateChange={
                    (draftstate) => {
                        setdraftedState(draftstate);
                        console.log(draftstate.getCurrentContent());
                    }
                }
            />
        </div>           
    );
}

export default DraftEditor;
