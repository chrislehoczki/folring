import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';
import queryString from 'query-string';

import {
  Redirect
} from 'react-router-dom'

import { authenticateToken } from '../../actions/auth';

class Login extends Component {

	componentDidMount() {
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
		console.log('USER PROPS', this.props.user)
		return (
			<div>
				<a href="/auth/facebook">Login with Facebook</a>
				{this.props.user._id ?
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
        authenticateToken
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);;