import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProfileAdmin from '../Pages/ProfileAdmin'
import ReadBlog_Admin from '../Pages/ReadBlog_Admin'
import ReadBlogReview from '../Pages/ReadBlog_Admin'
import Nav from '../components/Navbar'
import FetchReport from '../components/FetchReport'

export default () => (
  <Router>
    <Nav/>
    <Switch> 
      <Route exact path="/">
        <ProfileAdmin/>
      </Route>
      <Route path="/read:type/:blogId" name="blogId" component={ReadBlog_Admin} />
    </Switch>
  </Router>
)
