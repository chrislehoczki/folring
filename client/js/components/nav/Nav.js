
import {
  Link
} from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutUser } from '../../actions/auth';

class Nav extends Component {

	logout() {
		this.props.logoutUser();
	}

	render() {
		return (
			<div>
	     	{ this.props.user ? 
	      	<div className="nav">
	       		<Link to="/rooms"><button className="home" title="home"></button></Link>
	       		<Link to="/profile"><button className="profile" title="profile"></button></Link>
	       		<button onClick={this.logout.bind(this)}>Logout</button> 
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


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutUser
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);;
