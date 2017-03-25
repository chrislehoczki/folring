import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Homepage from './homepage/Homepage';
import Profile from './profile/Profile';
import Tolring from './tolring/Tolring';
import Nav from './nav/Nav.js';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={props => (
//     // pass the sub-routes down to keep nesting
//     <route.component {...props} routes={route.routes}/>
//   )}/>
// )

const RouteConfigExample = () => (
  <Router>
    <div>
      <Nav />
    	<Route exact path="/" component={Homepage}/>
    	<Route path="/profile" component={Profile}/>
    	<Route path="/tolring" component={Tolring}/>
    </div>
  </Router>
)

export default RouteConfigExample