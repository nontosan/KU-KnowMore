// IMPORT LIBRARY //
import React, { useState } from 'react';
import Draft from 'react-wysiwyg-typescript';
import { EditorState } from 'draft-js';
// END OF IMPORT LIBRARY //

// IMPORT CSS //
import '../section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

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
