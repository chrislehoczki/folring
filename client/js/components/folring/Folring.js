
import React, { Component } from 'react';
import Messaging from './messaging/Messaging';
import Game from './game/Game.js';
import Users from './users/Users.js';
require('./Folring.css');

export default class Folring extends Component {

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
				console.log("UPDATED ROOM STATE", this.state)
			});
	 	});

	 	window.addEventListener("beforeunload", (ev) => 
		{  
		    ev.preventDefault();
		    window.socket.emit('leave_room', {user: window.user});
		    return ev.returnValue = 'Are you sure you want to close?';
		});
	}

	sendState(state) {
		window.socket.emit('update_room', {game: state})
	}

	render() {
		return (
			<div>
				<Users players={this.state.room.players}/>
				<Game sendState={this.sendState} room={this.state.room}/>
				<Messaging />
			</div>
		);
	}
}
