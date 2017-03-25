
import React, { Component } from 'react';
import Messaging from './messaging/Messaging';
import Game from './game/Game.js';
import Users from './users/Users.js';
require('./Tolring.css');

export default class Tolring extends Component {

	constructor(props) {
		super(props);
		this.state = {
			room: {
				players: []
			}
		};
		this.sendState = this.sendState.bind(this);
	}

	componentWillUnmount() {
		// const user = window.localStorage.user;
		const user = window.user;
		window.socket.emit('leave_room', {user});
	}

	componentDidMount() {
		window.socket.on('update_room', (room) => {
			this.setState({...this.state, ...room}, () => {
				console.log(this.state)
			})
	 	});
	}

	sendState(state) {
		console.log(state);
		window.socket.emit('update_room', {game: state})
	}

	render() {
		return (
			<div>
				<h1>Tolring lives!</h1>
				<Users players={this.state.room.players}/>
				<Game sendState={this.sendState} room={this.state.room}/>
				<Messaging />
			</div>
		);
	}
}
