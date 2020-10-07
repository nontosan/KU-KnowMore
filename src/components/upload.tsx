import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

const Photo: React.FC = () => {

    const [state, setState] = useState({photo: '',});

    const {photo,} = state;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setState((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }));
        console.log(state.photo) // returns nothing
        console.log(event.target.value);
    };
    
    return (
        <div>
            <InputGroup className="bigupload" size="lg">
                <Card className="uploadfile">
                    <div className='photo'>
                        <input
                        type='file'
                        id='photo'
                        name='photo'
                        accept=''
                        onChange={onChange}
                        value={photo}
                        ></input>
                    </div>
                </Card>
                <InputGroup.Prepend className="textup">
                <Button className="cancel-button" variant="outline-secondary">Upload File</Button>
                </InputGroup.Prepend>
            </InputGroup><br />
        </div>
    )
};

export default Photo;