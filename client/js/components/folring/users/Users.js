
import React, { Component } from 'react';
import User from './User';

export default class Users extends Component {
	render() {
		let players = null;
		let spectators = null;
		if (this.props.players) {
			players = this.props.players.map((user, i) => <User userType="player" key={i} number={i} user={user.username} />)
		}

		if (this.props.spectators) {
			spectators = this.props.spectators.map((user, i) => <User userType="spectator" key={i} number={i} user={user.username} />)
		}
		
		return (
			<div id="users">
				{players}
				<span style={{ display: 'none' }}>and {this.props.spectators.length} spectators</span>
			</div>
		);
	}
}

