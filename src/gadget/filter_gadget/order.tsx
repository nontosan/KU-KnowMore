import React, { useState , Component } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ToggleButton from 'react-bootstrap/ToggleButton';
function Order(props:any){

    const radios = [
        { name: "Date", value: '1' },
        { name: 'Like', value: '2' },
        { name: 'View count', value: '3' },
    ];
    //checked={props.radioValue === radio.value}
    return (
        <div>
            <div>Sort by <br/></div>
            <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={props.clicked}
                    onChange={(e) => {
                        props.setChecked(props.radioValue === radio.value)
                        props.setRadioValue(e.currentTarget.value)
                    }}>
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default Order;

