

import React, { Component } from 'react';

export default class User extends Component {
	render() {
		const user = this.props.user;
		let content = null;
		if (this.props.type === 'player') {
			content = `Player ${this.props.number}: ${this.props.user}`
		} else {
			content = `Spectator ${this.props.number}: ${this.props.user}`
		}
		return (
			<div className='user'>{content}</div>
		);
	}
}
