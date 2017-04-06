

import React, { Component } from 'react';
import MiniFolring from '../minifolring/MiniFolring';

export default class Room extends Component {

	joinRoom(playerNo, e) {
		const user = this.props.user;
		window.socket.emit('join_room', {room: this.props.room.id, user, player: playerNo});
		this.props.history.push(`/folring?userType=player&roomId=${this.props.room.id}`);
	}

	spectateRoom() {
		const user = this.props.user;
		window.socket.emit('spectate_room', {room: this.props.room.id, user});
		this.props.history.push('/folring?userType=spectator');
	}

	render() {
		const room = this.props.room;
		return (
			<div className="room">
				<MiniFolring room={room}/>
				<p>{room.id}</p>
				<p>Player 1: {room.players[0] ? room.players[0].username : <button onClick={this.joinRoom.bind(this, 0)}>Join</button>}</p>
				<p>Player 2: {room.players[1] ? room.players[1].username : <button onClick={this.joinRoom.bind(this, 1)}>Join</button>}</p>
				<p>Spectators: {this.props.room.spectators.length} <button onClick={this.spectateRoom.bind(this)}>Spectate</button></p>
			</div>
		);
	}
}
// onClick={/*this.joinRoom.bind(this)*/}
