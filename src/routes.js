import React from 'react'
import { Router, Route } from 'react-router'

import App from 'container/App'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" components={App}/>
  </Router>
)

export default Routes
