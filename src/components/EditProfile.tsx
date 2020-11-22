// IMPORT LIBRARY //
import React , { useState , useEffect , Suspense} from "react";
import Button from 'react-bootstrap/Button';
import Upload from './UploadProfile';
import UploadFile from './UploadFile';
import DownloadFile from './DownloadFile';
import ImageComponent from './Display';
import UploadMulFile from './UploadMulFile';
import Demo from './UploadTest';
import { Col, Container, Row ,Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { User_Sch} from "../interfaces/user";
import { Spin } from 'antd';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import 'bootstrap/dist/css/bootstrap.min.css';
import './editprofile.css';
import {useHistory} from "react-router"
import 'antd/dist/antd.css';
import Modal from 'react-bootstrap/Form';

import 'antd/dist/antd.css';
import { notification,message,AutoComplete } from 'antd';
  
const key = 'updatable';
function EditProfile (props:any) {
  const userId = props.match.params.userId
  //console.log(userId)
  
  const fetchProfile = () => {
    ProfileService.fetchProfileSpecific(userId)
    .then(userInfo => {
      setUserInformation(userInfo);
      setusername(userInfo[0].username);
      setname(userInfo[0].name);
      setdescriptions(userInfo[0].profile_description);
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
  const user_id = window.location.pathname.split("/")[2]
  const buttonstate = () => {
    //const userId = props.match.params.userId
    //console.log(userId)
    const key = 'updatable';
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
      if(nme!=='' && usrname!== ''){
        openMessage()
        ProfileService.EditPro(editedProfile,userId)
          .then(savedEditedProfile => {
            //console.log(savedEditedProfile)
            setTimeout(() => {
              message.success({ content: 'Loaded!', key, duration: 2 });
            }, 1);
            window.location.replace(`/userpage/${user_id}`);
          });
      }else {
        alert('กรุณาใส่ข้อมูลให้ครบถ้วน')
      }
  }; 
  const openMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Already edit profile', key, duration: 2 });
    }, 500);
  };
  const close = () => {
      console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.',
      );
    };
  const openNotification = () => {
      const key = `open${Date.now()}`;
      const btn = (
        <Button type="primary"  onClick={() => {
          notification.close(key)
          window.location.replace(`http://localhost:3000/userpage/${user_id}`);
        }}>
          Confirm
        </Button>
      );
      notification.open({
        message: 'Notification Cancel Edit profile',
        description:
          'Would you like to discard editing your blog',
        btn,
        key,
        onClose: close,
      });
    };

  return (
    <div className ="EditProfile">
      <div className="hot-kl">
      <Card.Header>Edit User Information</Card.Header>
      <div className="containerr">
        <Upload  userID={userId}/>
        <div className="profile">
          <div className = "Name">
            <div className="typeinfo">
              NAME
              <div className="reddok">*</div>
            </div>
            {userInformation.map(UserInfo=>
            <Form.Control type="text" value={nme}
            onChange={e => setname(e.target.value)}/>
              )}
          </div>
          <div className = "Username">
            <div className="typeinfo">
              USERNAME<div className="reddok">*</div>
            </div>
            {userInformation.map(UserInfo=>
            <Form.Control type="text" value={usrname}
            onChange={e => setusername(e.target.value)}/>
              )}
          </div>
          <div className = "Des">
            <div className="typeinfo">
              Profile Descriptions
            </div>
            <br/>
            <Form.Control as="textarea" rows={3}  name="paragraph_text" value={descriptions}
            onChange={e => setdescriptions(e.target.value)}/>
          </div>
          {false &&
          <div className="Pro_pic">
          <Suspense fallback={<div><Spin /></div>}>
            {userInformation.map(a=>
                <ImageComponent userid={a.pic_dir}/>
            )}
          </Suspense>
          </div>
          }
        </div>
      </div>
      </div>
        <div className="button">
          <Button variant="success" onClick = {e=>{
            buttonstate()
            }}>Submit</Button>{' '}
          <Button variant="danger" onClick={e=>openNotification()}> Cancel </Button>
          </div>
    </div>
  );
}

export default EditProfile;