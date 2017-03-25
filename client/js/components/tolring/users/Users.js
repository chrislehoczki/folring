
import React, { Component } from 'react';
import User from './User';

export default class Users extends Component {
	render() {
		console.log('USERS in USERS.js', this.props.players);

		const users = this.props.players.map((user) => <User user={user} />)

		return (
			<div id="users">
			<h2> Current Users </h2>
				{users}
			</div>
		);
	}
}

