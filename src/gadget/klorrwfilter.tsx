import React, { useState , Component } from 'react';
import Filtermodal from "../modals/filter"
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

//function Choosefilter
function Choosefilter(props:any) {

    return (
      <ToggleButtonGroup type="checkbox" value={props.type} onChange={props.handle}> 
        <ToggleButton value={1}>ความรู้</ToggleButton>
        <ToggleButton value={2}>รีวืว</ToggleButton>
      </ToggleButtonGroup>
    );
  }

export default Choosefilter;