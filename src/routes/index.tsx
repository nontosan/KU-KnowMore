import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProfileAdmin from '../Pages/ProfileAdmin'
import ReadBlog_Admin from '../Pages/ReadBlog_Admin'

export default () => (
  <Router>
    <Switch> 
      <Route exact path="/">
        <ProfileAdmin/>
      </Route>
      
      
      <Route path='/:blogID'>
        <ReadBlog_Admin/>
      </Route>
    </Switch>
  </Router>
)