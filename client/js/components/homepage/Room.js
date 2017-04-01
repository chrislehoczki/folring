

import React, { Component } from 'react';


export default class Room extends Component {

	joinRoom() {
		const user = this.props.user;
		window.socket.emit('join_room', {room: this.props.room.id, user});
		this.props.history.push('/Folring');
	}

	spectateRoom() {

	}

	render() {
		console.log('RECEIVING ROOM', this.props.room);
		const room = this.props.room;
		return (
			<div onClick={this.joinRoom.bind(this)} className="room">
				<p>{room.id}</p>
				<p>Player 1: {room.players[0] ? room.players[0].username : <button onClick={this.joinRoom.bind(this, 0)}>Join</button>}</p>
				<p>Player 2: {room.players[1] ? room.players[1].username : <button onClick={this.joinRoom.bind(this, 1)}>Join</button>}</p>
				<p>Spectators: {this.props.room.spectators.length} <button onClick={this.spectateRoom.bind(this)}>Spectate</button></p>
			</div>
		);
	}
}
