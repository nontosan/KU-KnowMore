// IMPORT LIBRARY //
import React, { useState , useEffect , Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { draftToHtml } from 'react-wysiwyg-typescript';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DisplayFile from '../components/showcontent/displayfile';
import DisplayFileandDel from '../components/showcontent/DisandDel';

// IMPORT SERVICE //
import SectionService from '../services/SectionService';
import BlogsService from '../services/BlogsService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Section } from '../interfaces/Section';
import { Attachments } from '../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { convertToRaw, EditorState } from 'draft-js';
import { type } from 'os';
import { convertToObject } from 'typescript';
import { useLocation,useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import minus from '../Photo/minus_PNG39.png';
import GearEdit from '../Photo/gear-edit6.png';


import 'antd/dist/antd.css';

import { notification,message } from 'antd';
//------------------------------------------------------------------//

const ReadSection = (props:any) => {
  const [sectionsInformation, setSectionsInformation] = useState<Section[]>([]);
  const [afterFetch, setafterFetch] = useState<boolean>(false);
  const [displayHTML, setDisplayHTML] = useState<any>();
  const sectionId = (props.match.params.sectionId);
//console.log(sectionId);
  const [stateCheck, setstateCheck] = useState<boolean>(false);
  const [attachmentsInformation, setattachmentsInformation] = useState<Attachments[]>([]);
  //const blogId = window.location.pathname.split("/")[2]
  //const location=useLocation();
  const history=useHistory()
  const [sectionName, setSectionName] = useState<string>("");
  const [author, setAuthor] = useState<string>('');
  
  const fetchSection = () => {
      SectionService.fetchSectionsSpecific(sectionId)
          .then(sectioninfo => {
              BlogsService.fetchBlogSpecific(sectioninfo[0].blog_id)
                  .then(bloginfo => {
                      setAuthor(bloginfo[0].user_id);
                  })
              setSectionsInformation(sectioninfo);
              setstateCheck(true);
          })
  }
  const initdraft = () => {
      const draftstate = sectionsInformation[0].content;
      const markup = draftToHtml(
          draftstate, 
      );
      //console.log(markup);
      setDisplayHTML(markup);
      setSectionName(sectionsInformation[0].section_name);
  }
  const deletesection=()=>{
      console.log("delete seciton")
      SectionService.deleteSection(sectionId)
      //window.location.replace(`http://localhost:3000/knowledge/${sectionsInformation[0].blog_id}`)
  }
  ////////antd//////////
  const key = 'updatable';

  const openMessage = () => {
      console.log("hello")
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
          message.success({ content: 'Already delete section', key, duration: 2 });
      }, 100);
      
  };

  const close = () => {
      console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.',
      );
    };
  const openNotification = () => {
      const key = `open${Date.now()}`;
      const btn = (
      <a href={`http://localhost:3000/readknowledge/${sectionsInformation[0].blog_id}`}>
        <Button type="primary"  onClick={() => {
          notification.close(key)
          openMessage()
          deletesection()
        }}>
          Confirm
        </Button>
      </a>
      );
      notification.open({
        message: 'Notification',
        description:
          'Would you like to delete this section from your blog?',
        btn,
        key,
        onClose: close,
      });
    };
  //////////////////
  useEffect(() => {
      fetchSection();
  },[])
  useEffect(() => {
      if (stateCheck !== false){
          initdraft();
          setafterFetch(!afterFetch);
      }
  },[stateCheck])
  //useEffect( () => {
  //    initdraft();
  //    setafterFetch(!afterFetch);
  //},[sectionsInformation])

  return (
      <div>
          <div className="hot-kl">
              <Card.Header>
                  <strong>
                      Section 
                  </strong> : {sectionName}
                
              </Card.Header>
          </div>
          {/*ข้อมูล*/}
          {afterFetch &&
                <div className="div-section-content" dangerouslySetInnerHTML={{__html: displayHTML}} />
            }
          {/*ไฟล์*/}
          <div className="display_read">
              <h4>Attachments:</h4>
              <DisplayFile secid = {sectionId}/>
          </div>
          <div className="read_button">
              <Button variant="secondary" onClick={e=>history.goBack()}>back</Button>
          </div>
      </div>
  );
}
export default ReadSection;
