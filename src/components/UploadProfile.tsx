import React, { Component} from 'react';
import axios from 'axios'
import { render } from '@testing-library/react';

class Upload extends Component {

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
            url: `http://188.166.178.33:3000/users/5f82fd5504eb8600aa617b6b/profile_pic`,
            method: "POST",
            headers:{
                authorization: 'test'
            },
            data: profile_pic
        })
    }

    render() {
        return (
            <div className="Up">
                <h1>THE FORM</h1>
                <form>
                    <div className="">
                        <label>Select File </label>
                        <input multiple type="file" name="profile_pic" 
                        onChange={(e)=>this.handleFile(e)} />
                    </div>
                    <br />
                    <button type="button" onClick={(e)=>this.handleUpload(e)}>Upload</button>
                </form>
            </div>
        );
    }
}

export default Upload;