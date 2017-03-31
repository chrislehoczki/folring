
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
				players: [],
				spectators: [],
				game: null
			}
		};
		this.sendGame = this.sendGame.bind(this);
	}



	componentWillUnmount() {
		
	}

	leaveGame() {
		// const user = window.localStorage.user;
		const user = this.props.user;

		window.socket.emit('leave_room', { user });
		this.props.history.push('/');
	}

	componentDidMount() {

		window.socket.on('update_room', (room) => {
			console.log("NEW ROOM OBJECT RECEIVED", room)
			const newRoom = {...this.state.room, ...room};
			console.log('NEW ROOM OBJECT', newRoom.room)

			this.setState({room: newRoom}, () => {
				console.log('NEW ROOM STATE', this.state.room)
			});
	 	});

	 // 	window.addEventListener("beforeunload", (ev) => 
		// {  
		//     ev.preventDefault();
		//     window.socket.emit('leave_room', {user: window.user});
		//     return ev.returnValue = 'Are you sure you want to close?';
		// });
	}

	sendGame(game) {
		window.socket.emit('update_room', game , this.props.user);
	}

	render() {
		return (
			<div className="game-holder">
				<button onClick={this.leaveGame.bind(this)}>Leave Game</button>
				<Users players={this.state.room.players}/>
				<Game sendGame={this.sendGame} room={this.state.room}/>
				<Messaging user={this.props.user} />
			</div>
		);
	}
}
