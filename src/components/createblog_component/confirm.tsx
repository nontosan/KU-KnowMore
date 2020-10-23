import React from 'react';
import './input.css';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router"
function Confirm() {
    const history=useHistory()
    return (
        <div className="Confirm"> 
            <div className="Cancel">
                <Button variant="danger" onClick={e=>history.goBack()}> Cancel </Button>
            </div>
            <div className="Submit">
                <Button variant="success"> Submit </Button>
            </div>
        </div>
    );
}


export default Confirm;