
import {
  Link
} from 'react-router-dom'
import React, { Component } from 'react';

export default class Nav extends Component {
	render() {
		return (
			<ul>
		    	<li><Link to="/">Home</Link></li>
		       	<li><Link to="/profile">Profile</Link></li>
		       	{/*<li><Link to="/Folring">Folring</Link></li>*/}
    		</ul>
		);
	}
}
