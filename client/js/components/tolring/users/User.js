

import React, { Component } from 'react';

export default class User extends Component {
	render() {
		const user = this.props.user;
		return (
			<div className='user'>{this.props.user}</div>
		);
	}
}
