import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class DownloadFile extends React.Component {
    constructor(props:any) {
        super(props);
    }

    downloadData = () => {
        /*fetch('http://188.166.178.33:3000/users')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(new Blob([response.data]));
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'testi';
                    a.click();
                });
            });*/
            axios({
                url: 'http://188.166.178.33:3000/profile_pic/Horse-1200x900_91c3.jpg', //download random pic from this API 
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.jpg'); //change type file here
                document.body.appendChild(link);
                link.click();
              });
    }

    downloadDataTest = () => { //download this API's picture , mai mee kor dai
            axios({
                url: 'https://picsum.photos/id/1024/1920/1280',
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Pro_Pic.jpg');//change type file here
                document.body.appendChild(link);
                link.click();
              });
    }
    
    downloadFile = () => { //Not complete yet
        axios({
            url: 'http://188.166.178.33:3000/attachments_dir/pdf-test_4710c.pdf',
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

    render() {
        return(
            <div id="container">
                <h1>Download File Using React App</h1>
                <h3>Download Test Data (Random Image) using Button</h3>
                <Button variant="secondary" onClick={this.downloadData}>Download</Button>
                <h3>Download Test Data (Random Image) using Link</h3>
                <a href="#" onClick={this.downloadData}>Download</a>
                <h3>Download This Below Image(Original Size)</h3>
                <a href='#' onClick={this.downloadDataTest}>Download this Image</a>
                <h3>Download Attachments from Sections</h3>
                <Button variant="secondary" onClick={this.downloadFile}>Download<br/></Button>
                <a href="http://188.166.178.33:3000/attachments_dir/test_41013.pdf">Open File in New Tab</a>
            </div>
        )
    }
}

export default DownloadFile;