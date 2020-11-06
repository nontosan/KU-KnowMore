import React , {useEffect , useState} from 'react';
import SectionService from '../services/SectionService';
import { Attachments } from '../interfaces/blog'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './section.css';
import './file.css';
import { CloudDownloadOutlined } from '@ant-design/icons';
import "./DisplayFile.css"
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
        <div className = "bigcont" >
            {checkNull&&
                <div>
                    &nbsp;&nbsp;&nbsp;No file
                </div>
            }
            {attachmentsInformation.map(file=>
                <ListGroup.Item className="container">
                    <a> {file.originalname}</a>
                    <a href={`https://backend.ku-knowmore.xyz/${file.path}` } className="icon"><CloudDownloadOutlined /></a>
                </ListGroup.Item>
            )}
            
        </div>
    );
};

export default DisplayFile;