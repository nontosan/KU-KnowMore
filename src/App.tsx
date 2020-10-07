import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import WriteSection from "./components/WriteSection";

import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/writesection">
                        <WriteSection />
                    </Route>
                    <Route path="/">
                        <Link to="/WriteSection">WriteSection</Link>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;