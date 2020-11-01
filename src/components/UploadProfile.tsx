import React, { Component} from 'react';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class Upload extends React.Component<any,any> {
    
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
        const profile_pic = new FormData()
        profile_pic.append('profile_pic',file)
        //formdata.append('name','test')

        axios({
            url: `https://backend.ku-knowmore.xyz/users/${this.props.userID}/profile_pic`, //Sample API 
            method: "POST",
            headers:{
                authorization: 'test',
                'Content-Type': 'multipart/form-data'
            },
            data: profile_pic
        });
        alert("Upload Complete");
    }

    render() {
        return (
            <div className="Up">
                <h1>Upload Pic</h1>
                <form>
                    <div className="">
                        <label>Select File </label>
                        <input type="file" multiple name="profile_pic" 
                        onChange={(e)=>this.handleFile(e)} />
                    </div>
                    <br />
                    <Button variant="primary"  onClick={(e)=>this.handleUpload(e)}>Upload</Button>
                </form>
            </div>
        );
    }
}

export default Upload;