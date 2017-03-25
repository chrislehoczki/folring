// modules/routes.js
import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import App from '../components/App';
import Homepage from '../components/homepage/Homepage';
import Profile from '../components/profile/Profile';
import Tolring from '../components/tolring/Tolring';


export default (
    <Route path='/' component={ App } >
    	<Route path='home' component={ Homepage } />
    	<Route path='profile' component={ Profile }/>
    	<Route path='play' component={ Tolring }/>
    </Route>
);