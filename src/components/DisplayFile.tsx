import React , {useEffect , useState} from 'react';
import SectionService from '../services/SectionService';
import { Attachments } from '../interfaces/blog'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function DisplayFile (props:any) {

    const fetchAttachments = () => {

        //console.log(props.secid)
        SectionService.fetchSectionFiles(props.secid)
        .then(attachments => {
            setattachmentsInformation(attachments)
            console.log(attachments)
          });
    }

    useEffect(() => {
        fetchAttachments();
    },[])

    const [attachmentsInformation, setattachmentsInformation] = useState<Attachments[]>([]);

    return (
        <div className = "Display">
            {attachmentsInformation.map(file=>
            <a href={`http://188.166.178.33:3000/${file.path}`}> {file.originalname} <br/></a>
                )}
            
        </div>
    );
};

export default DisplayFile;