import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProfileAdmin from '../Pages/ProfileAdmin'
import ProfileAdmin_comment1 from '../Pages/ProfileAdmin_comment'
import ProfileAdmin_knowledge from '../Pages/ProfileAdmin_knowledge'
import ProfileAdmin_review from '../Pages/ProfileAdmin_review'
import ReadBlog_Admin from '../Pages/ReadBlog_Admin'

export default () => (
  <Router>
    <Switch> 
      <Route exact path="/">
       <ProfileAdmin/>
      </Route>
      <Route path="/review">
       <ProfileAdmin_review/>
      </Route>
      <Route path="/knowledge">
       <ProfileAdmin_knowledge/>
      </Route>
      <Route path="/comment">
       <ProfileAdmin_comment1/>
      </Route>
      <Route path="/read:type/:blogId" name="blogId" component={ReadBlog_Admin} />
    </Switch>
  </Router>
)
