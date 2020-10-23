// IMPORT LIBRARY //
import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import Filtermodel from '../modals/filter'
// END OF IMPORT COMPONENT //

// IMPORT CSS //
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const HomePage = () => {
    return (
        <div>
            <div className="main-div-main">
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="search-bar"/>
                <Filtermodel />
            </div>
            <div className="hot-kl">
                <Card.Header>KNOEWLEDGE BLOG</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="hot-kl">
                <Card.Header>REVIEW BLOG</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
};

export default HomePage;