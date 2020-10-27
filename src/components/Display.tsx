import React from 'react';
import {useImage } from 'react-image';
<<<<<<< HEAD
import './section.css';
=======
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 6781785d7bb1f28a71bafd4d11024f148ca942b2

function ImageComponent (props:any) {
  //console.log(props.className);
  const {src} = useImage({
      srcList: `http://188.166.178.33:3000/${props.userid}`, //this is my edit
    })
   
<<<<<<< HEAD
    return <img className="profile-page-pic" src={src} />
=======
    return <Image className={`${props.className}`} src={src} roundedCircle/>
>>>>>>> 6781785d7bb1f28a71bafd4d11024f148ca942b2
  }
   
  export default ImageComponent;