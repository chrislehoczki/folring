
import React, { Component } from 'react';
import User from './User';

export default class Users extends Component {
	render() {
		console.log('USERS in USERS.js', this.props.players);
		let players = null;
		if (this.props.players) {
			players = this.props.players.map((user) => <User user={user.username} />)
		}
		
		return (
			<div id="users">
			<h2> Current Players </h2>
				{players}
			</div>
		);
	}
}

