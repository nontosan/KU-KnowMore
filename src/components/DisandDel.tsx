import React , {useEffect , useState} from 'react';
import SectionService from '../services/SectionService';
import { Attachments } from '../interfaces/blog'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./DisandDel.css"

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
            <div className="outercont borderallfiles">
                <Card.Header>All Files</Card.Header>
                <ListGroup variant="flush" >
                    {attachmentsInformation.map(file=>(
                        <ListGroup.Item className="filecontainer" >    
                            <a href={`https://ku-knowmore.xyz/${file.path}`} className="openfile"> {file.originalname}</a>
                            <Button variant="danger" size="sm" className="deletefile"  onClick={e => deletestate(file._id)}>DELETE</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default DisplayFileandDel;