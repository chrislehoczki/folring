
import {
  Link
} from 'react-router-dom'
import React, { Component } from 'react';

export default class Nav extends Component {
	render() {
		return (
			<div>
	     	{ this.props.user ? 
	      	<div className="nav">
	       		<Link to="/"><button className="home" title="home"></button></Link>
	       		<Link to="/profile"><button className="profile" title="profile"></button></Link>
			  	</div>
	  		: null }
  		</div>
		);
	}
}
