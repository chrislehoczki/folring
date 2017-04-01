

import React, { Component } from 'react';


export default class Room extends Component {

	joinRoom() {
		const user = this.props.user;
		window.socket.emit('join_room', {room: this.props.room.id, user});
		this.props.history.push('/Folring');
	}

	render() {
		console.log('RECEIVING ROOM', this.props.room);
		return (
			<div onClick={this.joinRoom.bind(this)} className="room">
				{this.props.room.id}
			</div>
		);
	}
}
