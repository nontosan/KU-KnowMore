import React, { useState , Component } from 'react';
import Filtermodal from "../../modals/filter"
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

//function Choosefilter
function Choosefilter(props:any) {
  const [knowledge,setknowledge] = useState<boolean>(false)
  const [review,setreview] = useState<boolean>(false)
  console.log(knowledge)
    return (

      <ToggleButtonGroup type="checkbox" onChange={props.handle}> 
        {knowledge?
          <ToggleButton variant="secondary" value={1} onClick={() => setknowledge(false)}>ความรู้</ToggleButton>
          :
          <ToggleButton variant="success" value={1} onClick={() => setknowledge(true)}>ความรู้</ToggleButton>
        }
        {review?
          <ToggleButton variant="secondary" value={2} onClick={() => setreview(!review)}>รีวิว</ToggleButton>
          :
          <ToggleButton variant="success" value={2} onClick={() => setreview(!review)}>รีวิว</ToggleButton>
        }
      </ToggleButtonGroup>
    );
  }

export default Choosefilter;