import React, { Component,useEffect,useState, Suspense } from 'react';
import axios from 'axios'

import ImageComponent from './DisplayOnProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './editprofile.css';
import "./uploadprofile.css"
class Upload extends React.Component<any,any> {
    check = false;
    state = {
        file: "",
    }

    handleFile(e:any){

        let file = e.target.files[0]
        this.setState({file: file})
        //console.log(e.target.files, "$$$$");
        //console.log(e.target.files[0], "$$$$");
    }

    async handleUpload(e:any){
        //console.log(this.state , "THE STATE ---- $$$$");
        const file = this.state.file
        const profile_pic = new FormData()
        profile_pic.append('profile_pic',file)
        //formdata.append('name','test')
        await axios({
            url: `https://ku-knowmore.xyz/users/${this.props.userID}/profile_pic`, //Sample API 
            method: "POST",
            headers:{
                authorization: 'test',
                'Content-Type': 'multipart/form-data'
            },
            data: profile_pic
        });
        alert("Upload Complete");
        window.location.replace(`/userpage/${this.props.userID}`);
    }
    render() {
        return (
            <div className="Upp">
                <div className="header">
                    <h2>Upload Pic</h2>
                </div>
                <div className="content">
                <form>
                    <div className="pic_input">
                        <input className="uploading" type="file" multiple name="profile_pic" 
                        onChange={(e)=>this.handleFile(e)} />
                    </div>
                    <br />
                </form>
                <Button variant="primary"  className="btnn" onClick={(e)=>this.handleUpload(e)}>Upload</Button>
                </div>
            </div>
        );
    }
}

export default Upload;