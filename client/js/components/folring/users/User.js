

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

		let userClass
		if (this.props.number === 0) {
			userClass = "user black"
		}
		else if (this.props.number === 1) {
			userClass = "user white"
		}
		else {
			userClass = "user"
		}
		
		return (
			<div className={userClass}>{content}</div>
		);
	}
}
