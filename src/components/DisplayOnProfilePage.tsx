import React from 'react';
import {useImage } from 'react-image';
//import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Image , Avatar} from 'antd';
function DisplayOnProfilePage (props:any) {
  //console.log(props.className);
  const {src} = useImage({
      srcList: `https://ku-knowmore.xyz/${props.userid}`, //this is my edit
    })
   
    return <Image className={`${props.className}`} src={src}/>
  }
   
export default DisplayOnProfilePage;