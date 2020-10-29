import React, { useState,useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Filtermodel from '../modals/filter';
import Showklinmain from "./ShowKnowledgeInMain";
import Showrwinmain from "./ShowReviewInMain";

import '../App.css';
import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {



    return (
        <div>
            <div className="main-div-main">
                <Filtermodel />
            </div>
            <div className="hot-kl">
                <Card.Header>KNOWLEDGE BLOG</Card.Header>
                <ListGroup variant="flush">
                    <Showklinmain />
                </ListGroup>
            </div>
            <div className="hot-kl" style={{ marginBottom : "50px" }}>
                <Card.Header>REVIEW BLOG</Card.Header>
                    <ListGroup variant="flush">
                        <Showrwinmain />
                    </ListGroup>
            </div>
        </div>
    )
}

export default Home
