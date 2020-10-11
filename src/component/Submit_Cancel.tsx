import React from 'react';
import './input.css';

function Submit_Cancel(props: { input: any; }) {
    
    const onSubmit = (e:any) => {
        e.preventDefault()
        console.log('submit value',props.input)   
    }

    //post to database
    /*const onSubmit = async (e: any) => {
      const response = await fetch('somewhere', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      }).then(res => res.json())
    }*/
  
    return (
        <div className="Confirm">
            <form onSubmit={onSubmit}>
                <button className="Submit" type="submit">
                    Submit
                </button>
                <button className="Cancel" type="reset">
                    Cancel
                </button>
            </form>
        </div>
    );
}


export default Submit_Cancel;