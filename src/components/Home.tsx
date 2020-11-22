import React, { useState,useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Filtermodel from '../modals/filter';
import Showklinmain from "./ShowKnowledgeInMain";
import Showrwinmain from "./ShowReviewInMain";
import FilterBar from './NewSearchFilter';
import '../App.css';
import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
const Home = () => {
    const [showFilter,setShowFilter] = useState<boolean>(false);


    return (
        <div>
            {false &&
                <div className="main-div-main">
                    <Filtermodel />
                </div>
            }
            {false &&
                <button className="main-div-main btn btn-success" onClick={() => setShowFilter(!showFilter)}>
                    SEARCH
                </button>
            }
            {true&&
                <div className="filter-bar" style={{ backgroundColor:"pink" }}>
                    <FilterBar />
                </div>
            }
            <div className="hot-kl">
                <Card.Header className="card-header">KNOWLEDGE BLOG</Card.Header>
                <ListGroup variant="flush">
                    <Showklinmain />
                </ListGroup>
            </div>
            <div className="hot-kl" style={{ marginBottom : "50px" }}>
                <Card.Header className="card-header">REVIEW BLOG</Card.Header>
                    <ListGroup variant="flush">
                        <Showrwinmain />
                    </ListGroup>
            </div>
        </div>
    )
}

export default Home
