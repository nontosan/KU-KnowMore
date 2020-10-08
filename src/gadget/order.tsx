import React, { useState , Component } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ToggleButton from 'react-bootstrap/ToggleButton';
function Order(){
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: "Date", value: '1' },
        { name: 'like', value: '2' },
        { name: 'Viewer', value: '3' },
    ];

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
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default Order;

