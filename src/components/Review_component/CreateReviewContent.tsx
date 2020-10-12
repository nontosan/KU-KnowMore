import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';
//import { reviews,blogs } from '../test_interface/review_interface';

//Service
//import ReviewService from '../test_services/ReviewService';

//CSS
import './CreateBlogReview.css';

// Component
import EditBlogScoreSlider from './EditBlogScoreSlider';

type BlogReview = {
    blog_type : string;
}


// NewReview Parent Component
const CreateBlogReview = (props : BlogReview) => {
    const [teachScore, setTeachScore] = useState(0);
    const [workScore, setWorkScore] = useState(0);
    const [roomScore, setRoomScore] = useState(0);
    const [overallScore, setOverallScore] = useState(0);
    const [draftstate, setdraftState] = useState<typeof EmptyState>();
    const [status, setStatus] = useState(false);

    
    const send = () => {
        setStatus(true)
    }

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

    const call = () => {
        alert(draftstate)
        alert(teachScore)
        alert(workScore)
        alert(roomScore)
        alert(overallScore)      
    } 


    return (
        <div>
            <div className ="div-content">
                <h1>Blog Header</h1>
            </div>
            <div className ="div-content" >
                <Draft 
                    onEditorStateChange={(editorState) => {setdraftState(editorState);}}
                />
            </div>
        
            <div className ="div-scrollbar">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <label className="label">สอนได้เข้าใจ</label>
                        </Col>
                        <Col>
                            <EditBlogScoreSlider setParentScore={setTeachScore} sending={status}/>
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
                            <EditBlogScoreSlider setParentScore={setWorkScore} sending={status}/>
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
                            <EditBlogScoreSlider setParentScore={setRoomScore} sending={status}/>
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
                            <EditBlogScoreSlider setParentScore={setOverallScore} sending={status}/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="div-button">
                <Button className="cancel-button" variant="outline-secondary">Cancel</Button>
                <Button className="submit-button" variant="outline-secondary" onClick={creatingBlog}>Submit</Button>
            </div>
            <div className ="div-content">
                <button onClick={call}>test_state</button>
            </div>
        </div>
    )
};

export default CreateBlogReview;