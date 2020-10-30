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

    const downloadFile = () => { //Not complete yet
        axios({
            url: 'http://188.166.178.33:3000/sections/5f872295f75b8a001bea596d/attachments',
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test_fetch file.pdf'); //change type file here 
            document.body.appendChild(link);
            link.click();
          });
        }

    return (
        <div className = "Display">
            {attachmentsInformation.map(test=>
            <a href={`http://188.166.178.33:3000/${test.path}`}> {test.originalname} || </a>
                )}
        </div>
    );
};

export default DisplayFile;