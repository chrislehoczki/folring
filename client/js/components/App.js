import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Homepage from './homepage/Homepage';
import Profile from './profile/Profile';
import Tolring from './tolring/Tolring';


const App = ({ routes }) => (
  <div>
    <h2>Tolring</h2>
    <ul>
    	<li><Link to="/">Home</Link></li>
       	<li><Link to="/profile">Profile</Link></li>
       	<li><Link to="/tolring">Tolring</Link></li>
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
)

const Bus = () => <h3>Bus</h3>
const Cart = () => <h3>Cart</h3>

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  { path: '/profile',
    component: Profile
  },
  { path: '/tolring',
    component: Tolring,
    // routes: [
    //   { path: '/tacos/bus',
    //     component: Bus
    //   },
    //   { path: '/tacos/cart',
    //     component: Cart
    //   }
    // ]
  },
  {
  	path: '/home',
  	component: Homepage
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const RouteConfigExample = () => (
  <Router>
    <div>
     <h2>Tolring</h2>
    <ul>
    	<li><Link to="/">Home</Link></li>
       	<li><Link to="/profile">Profile</Link></li>
       	<li><Link to="/tolring">Tolring</Link></li>
    </ul>

    {/*routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))*/}
      <Route exact path="/" component={Homepage}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/tolring" component={Tolring}/>
    </div>
  </Router>
)

export default RouteConfigExample