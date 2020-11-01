import React , {useEffect , useState} from 'react';
import SectionService from '../../../services/SectionService';
import { Attachments } from '../../../interfaces/blog'

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
            {attachmentsInformation.map(file=>(
                <>
                    <a href={`https://backend.ku-knowmore.xyz/${file.path}`}> {file.originalname}</a>
                    <Button variant="danger" size="sm"  onClick={e => deletestate(file._id)}>{file.filename}</Button><br/>
                </>
            ))}
        </div>
    );
};

export default DisplayFileandDel;