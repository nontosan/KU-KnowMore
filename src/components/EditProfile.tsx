// IMPORT LIBRARY //
import React , { useState , useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { User_Sch} from "../interfaces/user";
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import 'bootstrap/dist/css/bootstrap.min.css';
import './editprofile.css';
import {useHistory} from "react-router"
function EditProfile () {

const [usrname,setusername] = useState("");
const [descriptions,setdescriptions] = useState ("");
const [nme,setname] = useState("");
const [picture,setpicture] = useState("");
const [directory,setdir] = useState("");
const history=useHistory()

const buttonstate = () => {

  const newProfile :User_Sch = {
    name:nme,
    profile_description:descriptions,
    pic_name:"81082cfe10658c7ea8f4bfdd85da05ea",//has problem with upload pic
    username:usrname,
    pic_dir:"profile_pic/81082cfe10658c7ea8f4bfdd85da05ea" //has problem with upload pic
  };
  console.log(newProfile);
  ProfileService.CreateProfile(newProfile) 
    .then(savedNewProfile => {
      if (savedNewProfile !== null) {
        console.log(savedNewProfile);
      } else{
        alert("Save Error");
      }
    });
}; 

/*note
        <div className = "Upload">
            <button onClick = {buttonstate}>Upload</button>
      </div>
*/

  return (
    <div className ="EditProfile">
      <div className="profile">
        <div className = "Name">
          <input className="input" placeholder="Name" type="text" value={nme}
          onChange={e => setname(e.target.value)}></input>
        </div>
        <div className = "Username">
          <input className="input" placeholder="Username" type="text" value={usrname}
          onChange={e => setusername(e.target.value)}></input>
        </div>
        <div className = "Des">
          Profile Descriptions: <br/>
          <textarea className="text" name="paragraph_text" value={descriptions}
          onChange={e => setdescriptions(e.target.value)}>
          </textarea>
        </div>
        <div className = "pic">
            <input multiple type ="file" value = {picture}
            onChange = {e => setpicture(e.target.value)}></input>
        </div>
      </div>
    <div className="button">
        <Button variant="success" onClick = {buttonstate}>Submit</Button>
        <Button variant="danger" onClick={e=>history.goBack()}> Cancel </Button>
    </div>
    </div>
  );
}

export default EditProfile;