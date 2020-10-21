import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';
//import { reviews,blogs } from '../test_interface/review_interface';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//Service
//import ReviewService from '../test_services/ReviewService';

//CSS
import './CreateReviewContent.css';

// Component
import EditBlogScoreSlider from './EditBlogScoreSlider';
import { convertToRaw } from 'draft-js';


// NewReview Parent Component
const CreateBlogReview = (props : any) => {
    const [teachScore, setTeachScore] = useState(0);
    const [workScore, setWorkScore] = useState(0);
    const [roomScore, setRoomScore] = useState(0);
    const [overallScore, setOverallScore] = useState(0);
    const [draftstate, setdraftState] = useState<typeof EmptyState>();

    

    useEffect(() => {
        /*
        if(blog_type == edit)

        -- fetch data from database --

        -- set all component data --

        */
       
    });


    const creatingBlog = () => {
        /*
        if(blog_type == create)

        -- ReviewService.createBlogReview

        else if (blog_type == edit)

        -- ReviewService.editBlogReview

        else

        -- return ERROR

        */
        alert("save successful")
    }

    const exitBlog = () => {
        alert("redirect")

        // return value to parent to router
    }


    return (
        <div>
        
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">สอนได้เข้าใจ</label>
                        </Col>
                        <Col>
                            <EditBlogScoreSlider setParentScore={props.setTeachScore} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">จำนวนงาน</label>
                        </Col>
                        <Col>
                            <EditBlogScoreSlider setParentScore={props.setWorkScore} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">ความสำคัญในการเข้าเรียน</label>
                        </Col>
                        <Col >
                            <EditBlogScoreSlider setParentScore={props.setRoomScore}/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">ภาพรวม</label>
                        </Col>
                        <Col>
                            <EditBlogScoreSlider setParentScore={props.setOverallScore} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};

export default CreateBlogReview;