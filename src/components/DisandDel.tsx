import React , {useEffect , useState} from 'react';
import SectionService from '../services/SectionService';
import { Attachments } from '../interfaces/blog'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function DisplayFileandDel (props:any) { //This function is for EditSection

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

    const deletestate = (att_id:any) => {
        SectionService.deleteattachments(att_id)
        alert("Delete Complete")
        fetchAttachments();
        }

    const [attachmentsInformation, setattachmentsInformation] = useState<Attachments[]>([]);


    return (
        <div className = "Display">
            {attachmentsInformation.map(file=>
            <a href={`https://backend.ku-knowmore.xyz/${file.path}`}> {file.originalname} <br/></a>
                )}
            {attachmentsInformation.map(file=>
                <Button onClick={e => deletestate(file._id)}>{file.filename}</Button>
                )}
            
        </div>
    );
};

export default DisplayFileandDel;