import React , {useEffect , useState} from 'react';
import SectionService from '../../../services/SectionService';
import { Attachments } from '../../../interfaces/blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


function DisplayFile (props:any) {//This function is for ReadSection

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
            <a href={`https://backend.ku-knowmore.xyz/${file.path}`}> {file.originalname} <br/></a>
                )}
            
        </div>
        
    );
};

export default DisplayFile;