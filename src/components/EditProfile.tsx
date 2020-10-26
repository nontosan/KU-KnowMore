// IMPORT LIBRARY //
import React , { useState , useEffect , Suspense} from "react";
import Button from 'react-bootstrap/Button';
import Upload from './UploadProfile';
import DownloadFile from './DownloadFile';
import ImageComponent from './Display';
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

function EditProfile (props:any) {
  const userId = props.match.params.userId
  //console.log(userId)
  
  const fetchProfile = () => {
    ProfileService.fetchProfileSpecific(userId)
    .then(userInfo => {
      setUserInformation(userInfo);
      console.log(userInfo);
    })
  }
  
  useEffect(() => {
    fetchProfile();
  },[])
  
  const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
  const [usrname,setusername] = useState("");
  const [descriptions,setdescriptions] = useState ("");
  const [nme,setname] = useState("");
  const history=useHistory();
  
  const buttonstate = () => {
    //const userId = props.match.params.userId
    //console.log(userId)
    const editedProfile :User_Sch = {
      name:nme,
      profile_description:descriptions,
      username:usrname,
    };


    /*
    console.log(newProfile);
    ProfileService.CreateProfile(newProfile) 
      .then(savedNewProfile => {
        if (savedNewProfile !== null) {
          console.log(savedNewProfile);
        } else{
          alert("Save Error");
        }
      });*/

      console.log(editedProfile);
      ProfileService.EditPro(editedProfile,userId)
        .then(savedEditedProfile => {
          console.log(savedEditedProfile)
        });
  }; 

  return (
    <div className ="EditProfile">
      <div className="profile">
        <div className = "Name">
          {userInformation.map(UserInfo=>
          <input className="input" placeholder={UserInfo.name} type="text" value={nme}
          onChange={e => setname(e.target.value)}></input>
            )}
        </div>
        <div className = "Username">
          {userInformation.map(UserInfo=>
          <input className="input" placeholder={UserInfo.username} type="text" value={usrname}
          onChange={e => setusername(e.target.value)}></input>
            )}
        </div>
        <div className = "Des">
          Profile Descriptions: <br/>
          <textarea className="text" name="paragraph_text" value={descriptions}
          onChange={e => setdescriptions(e.target.value)}>
          </textarea>
        </div>
        <div className="button">
        <Button variant="success" onClick = {buttonstate}>Submit</Button>
        <Button variant="danger"> Cancel </Button>
        </div>
        ---------------
        <Upload userID={userId}/>
        ---------------
        This is my Profile_Pic
        <div className="Pro_pic">
        <Suspense fallback={<div>Loading... </div>}>
          {userInformation.map(a=>
          <ImageComponent userid={a.pic_dir}/>
          )}
        </Suspense>
        </div>
        </div>
    </div>
  );
}

export default EditProfile;