import React, { useState , Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
function Choosefilter() {
    const [value, setValue] = useState([1,2]);
  
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val:any) => {
        setValue(val);
        console.log(val)
    }
  
    return (
      <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}> 
        <ToggleButton value={1}>ความรู้</ToggleButton>
        <ToggleButton value={2}>รีวืว</ToggleButton>
      </ToggleButtonGroup>
    );
  }
  
export default Choosefilter;