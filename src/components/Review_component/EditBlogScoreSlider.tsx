import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

function EditBlogScoreSlider(props : any) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('0');

    if(props.sending){
      alert("Another One")  
    };

    const changeValue = (e: any) => {
      props.setParentScore(e.currentTarget.value);
      setRadioValue(e.currentTarget.value);
    } 
  
    const radios = [
      { name: '5', value: '5' },
      { name: '4', value: '4' },
      { name: '3', value: '3' },
      { name: '2', value: '2' },
      { name: '1', value: '1' },
    ];
  
    return (
      <>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => changeValue(e)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }

export default EditBlogScoreSlider;