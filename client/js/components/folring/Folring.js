
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
		this.updateRoom = this.updateRoom.bind(this);
	}

	
	leaveGame() {
		// const user = window.localStorage.user;
		const user = this.props.user;

		window.socket.emit('leave_room', { user });
		this.props.history.push('/');
	}

	componentDidMount() {
		console.log('MOUNTED TOLRING')
		this.mounted = true;
		window.socket.on('update_room', this.updateRoom);


	 // 	window.addEventListener("beforeunload", (ev) => 
		// {  
		//     ev.preventDefault();
		//     window.socket.emit('leave_room', {user: window.user});
		//     return ev.returnValue = 'Are you sure you want to close?';
		// });
	}


	updateRoom(room) {
			const newRoom = {...this.state.room, ...room};
			this.setState({room: newRoom});
			
	}

	componentWillUnmount() {
		console.log('UNMOUNTING TOLRING')
		this.mounted = false;
		window.socket.removeListener('update_room', this.updateRoom)
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
