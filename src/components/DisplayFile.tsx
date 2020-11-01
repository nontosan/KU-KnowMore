import React , {useEffect , useState} from 'react';
import SectionService from '../services/SectionService';
import { Attachments } from '../interfaces/blog'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './section.css';
import './file.css';

function DisplayFile (props:any) {//This function is for ReadSection
    const [checkNull, setCheckNull] = useState<boolean>(false);

    const fetchAttachments = () => {

        //console.log(props.secid)
        SectionService.fetchSectionFiles(props.secid)
        .then(attachments => {
            setattachmentsInformation(attachments)
            if(attachments.length==0){
                setCheckNull(true);
            }
            console.log(attachments)
          });
    }

    useEffect(() => {
        fetchAttachments();
    },[])

    const [attachmentsInformation, setattachmentsInformation] = useState<Attachments[]>([]);

    return (
        <div className = "Display blog-fl">
            {checkNull&&
                <div>
                    &nbsp;&nbsp;&nbsp;No file
                </div>
            }
            {attachmentsInformation.map(file=>
            <a href={`https://backend.ku-knowmore.xyz/${file.path}`}> {file.originalname} <br/></a>
                )}
            
        </div>
    );
};

export default DisplayFile;