
import React, { Component } from 'react';
import Messaging from './messaging/Messaging';
import Game from './game/Game.js';
import Users from './users/Users.js';

import queryString from 'query-string';
require('./Folring.css');

export default class Folring extends Component {

	constructor(props) {
		super(props);
		this.query = queryString.parse(this.props.location.search);
		this.state = {
			room: {
				players: [],
				spectators: [],
				game: null,
				id: this.query.roomId
			}
		};
		this.sendGame = this.sendGame.bind(this);
		this.updateRoom = this.updateRoom.bind(this);
	}

	
	leaveGame() {
		// const user = window.localStorage.user;
		const user = this.props.user;
		
		if (this.query.userType === 'player') {
			window.socket.emit('leave_room', { user });
		} else {
			window.socket.emit('unspectate_room', { user, roomId: this.state.room.id });
		}
		
		this.props.history.push('/');
	}

	componentDidMount() {
		window.socket.on('update_room', this.updateRoom);


	 // 	window.addEventListener("beforeunload", (ev) => 
		// {  
		//     ev.preventDefault();
		//     window.socket.emit('leave_room', {user: window.user});
		//     return ev.returnValue = 'Are you sure you want to close?';
		// });
	}


	updateRoom(room) {
		if (room.id === this.state.room.id) {
			const newRoom = {...this.state.room, ...room};
			this.setState({room: newRoom});
		}		
	}

	componentWillUnmount() {
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
				<Users players={this.state.room.players} spectators={this.state.room.spectators}/>
				<div className="folring-holder">
					<Game sendGame={this.sendGame} room={this.state.room} user={this.props.user}/>
				</div>	
				<Messaging user={this.props.user} />
			</div>
		);
	}
}
