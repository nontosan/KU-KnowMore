import React, { Component} from 'react';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
class UploadMulFile extends React.Component<any,any> {
    //const status = true
    state = {
        file: ""
    }

    handleFile(e:any){

        let file = e.target.files
        this.setState({file: file})
        console.log(file)

        //console.log(e.target.files, "$$$$");
        //console.log(e.target.files[0], "$$$$");
    }

    async handleUpload(e:any){
        //console.log(this.state , "THE STATE ---- $$$$");
        const files = this.state.file
        const attachments = new FormData()
        for (let i=0;i< files.length;i++){
          attachments.append('attachments',files[i])
        }

        await axios({
            url: `https://backend.ku-knowmore.xyz/sections/${this.props.secid}/attachments`, //Sample API 
            method: "POST",
            headers:{
              "Content-Type": "multipart/form-data",
            },
            data: attachments
        });
        alert("Upload Complete");
        this.props.callback();
    }

    render() {
        return (
            <div className="Up">
                <form>
                    <div className="">
                        <input type="file" multiple name="attachments" 
                        onChange={(e)=>this.handleFile(e)} />
                    </div>
                    <br />
                    <Button variant="primary" size="sm"  className="btnuploadfile" onClick={(e)=>this.handleUpload(e)}>
                        UploadFile Mul
                    </Button>
                </form>
            </div>
        );
    }
}

export default UploadMulFile;