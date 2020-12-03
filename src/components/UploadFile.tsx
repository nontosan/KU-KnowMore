import React, { Component} from 'react';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class UploadFile extends React.Component<any,any> {
    
    state = {
        file: ""
    }

    handleFile(e:any){

        let file = e.target.files[0]
        this.setState({file: file})

        //console.log(e.target.files, "$$$$");
        //console.log(e.target.files[0], "$$$$");
    }

    handleUpload(e:any){
        //console.log(this.state , "THE STATE ---- $$$$");
        const file = this.state.file
        const attachments = new FormData()
        attachments.append('attachments',file)
        //formdata.append('name','test')

        axios({
            url: `https://ku-knowmore.xyz/sections/5f872295f75b8a001bea596d/attachments`, //Sample API 
            method: "POST",
            headers:{
                authorization: 'test'
            },
            data: attachments
        });
        alert("Upload Complete");
    }

    render() {
        return (
            <div className="Up">
                <h1>Upload File</h1>
                <form>
                    <div className="">
                        <label>Select File </label>
                        <input type="file" multiple name="attachments" 
                        onChange={(e)=>this.handleFile(e)} />
                    </div>
                    <br />
                    <Button variant="primary"  onClick={(e)=>this.handleUpload(e)}>UploadFile</Button>
                </form>
            </div>
        );
    }
}

export default UploadFile;