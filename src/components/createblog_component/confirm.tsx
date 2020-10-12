import React from 'react';
import './input.css';
import Button from 'react-bootstrap/Button';

function Confirm() {
    return (
        <div className="Confirm"> 
            <div className="Cancel">
                <Button variant="danger"> Cancel </Button>
            </div>
            <div className="Submit">
                <Button variant="success"> Submit </Button>
            </div>
        </div>
    );
}


export default Confirm;