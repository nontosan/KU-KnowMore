import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import WriteSection from "./components/WriteSection";
import CreateEditSection from "./components/createeditsection";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Link to="/">
                        <Nav.Link href="/writesection">Home</Nav.Link>
                    </Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar>
                <Switch>
                    <Route path="/knowledgeblog">
                        <CreateEditSection />
                    </Route>
                    <Route path="/writesection">
                        <WriteSection />
                    </Route>
                    <Route path="/">
                        <Link to="/knowledgeblog">blog</Link>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;