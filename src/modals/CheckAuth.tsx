import React, { useState,useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router";
import Button from 'react-bootstrap/Button';
import {
  Link, Redirect,
} from 'react-router-dom';

const CheckAuth = () => {
    const history = useHistory()

    return (
        <div>
            <Modal 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show="true"
            >
                <Modal.Body>
                    Please Login First...
                </Modal.Body>
                <Modal.Footer>
                    <div className="Cancel">
                        <Button className="cancel-button" variant="danger" onClick={e=>history.goBack()}>Cancel</Button>
                    </div>
                    <div className="Submit">
                        <Link to="/login">
                            <Button className="submit-button" variant="success">Submit</Button>
                        </Link>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CheckAuth