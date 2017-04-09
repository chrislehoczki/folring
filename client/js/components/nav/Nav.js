
import {
  Link
} from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Nav extends Component {
	render() {
		return (
			<div>
	     	{ this.props.user ? 
	      	<div className="nav">
	       		<Link to="/rooms"><button className="home" title="home"></button></Link>
	       		<Link to="/profile"><button className="profile" title="profile"></button></Link>
			  	</div>
	  		: null }
  		</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    	user: state.user
    };
};



export default connect(mapStateToProps)(Nav);;
