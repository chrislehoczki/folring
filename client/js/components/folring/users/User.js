

import React, { Component } from 'react';

export default class User extends Component {
	render() {
		const user = this.props.user;
		let content = null;
		console.log(this.props)
		if (this.props.userType === 'player') {
			content = `Player ${this.props.number}: ${this.props.user}`
		} else {
			content = `Spectator ${this.props.number}: ${this.props.user}`
		}
		return (
			<div className='user'>{content}</div>
		);
	}
}
