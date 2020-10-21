import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProfileAdmin from '../Pages/ProfileAdmin'
import ReadBlogReview from '../Pages/ReadBlog_Admin'

export default () => (
  <Router>
    <Switch> 
      <Route exact path="/">
       <ProfileAdmin/>
      </Route>
      <Route path="/readReview/:blogId" name="blogId" component={ReadBlogReview} />
    </Switch>
  </Router>
)