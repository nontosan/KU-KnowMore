import React, { useState , Component } from 'react'
import '../style/section.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchReport from '../components/FetchReport'
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from 'react-bootstrap';

const ProfileAdmin = () => {
       
  const SelectContent = () => {
      return(
         <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example">
            <Tab eventKey="review" title="Review">
              <FetchReport content = "review"/>
            </Tab>
            <Tab eventKey="knowledge" title="Knowledge">
              <FetchReport content = "knowledge"/>
            </Tab>
            <Tab eventKey="comment" title="Comment">
              <FetchReport content = "comment"/>
            </Tab>
          </Tabs>
      )
  }
  
  return (
      <div>
          {SelectContent()}
      </div>
  );
}

export default ProfileAdmin;