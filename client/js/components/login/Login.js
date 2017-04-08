

import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

	login() {
		axios.get('/auth/facebook')
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	render() {
		return (
			<div>
				<a href="/auth/facebook">Login with Facebook</a>
			</div>
		);
	}
}
