import React, { useState , Component } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ToggleButton from 'react-bootstrap/ToggleButton';
function Order(props:any){

    const radios = [
        { name: "Date", value: '1' },
        { name: 'like', value: '2' },
        { name: 'Viewer', value: '3' },
    ];
    //checked={props.radioValue === radio.value}
    return (
        <div>
            <div>Order</div>
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

