import React, { Component} from 'react';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class UploadMulFile extends React.Component<any,any> {
    
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

    handleUpload(e:any){
        //console.log(this.state , "THE STATE ---- $$$$");
        const files = this.state.file
        const attachments = new FormData()
        for (let i=0;i< files.length;i++){
          attachments.append('attachments',files[i])
        }

        axios({
            url: `https://backend.ku-knowmore.xyz/sections/5f872295f75b8a001bea596d/attachments`, //Sample API 
            method: "POST",
            headers:{
              "Content-Type": "multipart/form-data",
            },
            data: attachments
        });
        alert("Upload Complete");
    }

    render() {
        return (
            <div className="Up">
                <h1>Upload Mul File</h1>
                <form>
                    <div className="">
                        <label>Select File </label>
                        <input type="file" multiple name="attachments" 
                        onChange={(e)=>this.handleFile(e)} />
                    </div>
                    <br />
                    <Button variant="primary" size="sm"  onClick={(e)=>this.handleUpload(e)}>UploadFile Mul</Button>
                </form>
            </div>
        );
    }
}

export default UploadMulFile;