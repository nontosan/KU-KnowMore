import React, { useState } from 'react';

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
    )
};

export default Photo;