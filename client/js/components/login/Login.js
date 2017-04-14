import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';
import queryString from 'query-string';

import {
  Redirect, Link
} from 'react-router-dom';

import { authenticateToken, loginUser } from '../../actions/auth';

import LoginModal from './LoginModal';

if (process.env.BROWSER) {
	require('./Login.css');
}

const io = require('socket.io-client')

class Login extends Component {

	componentDidMount() {
		console.log('MOUNTING LOGIN')

			if (window.localStorage.apitoken) {
				this.props.authenticateToken(window.localStorage.apitoken);
			}

			const query = queryString.parse(this.props.location.search);

			if (query.apitoken) {
				window.localStorage.setItem('apitoken', query.apitoken);
				this.props.authenticateToken(query.apitoken);
			}
	}

	render() {
		return (
			<div className="login">
				<a className="fbook-login" href="/auth/facebook">
					<img src="/client/images/fb.png"/>
					<p>Login With Facebook</p>
				</a>
				<LoginModal loginUser={this.props.loginUser}/>
				<Link to="/signup"><button title="signup">Signup Instead</button></Link>
				{this.props.user ?
					<Redirect to={{
				        pathname: '/rooms',
				        state: { from: this.props.location }
	      			}}/> : null }

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
        authenticateToken,
        loginUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);;