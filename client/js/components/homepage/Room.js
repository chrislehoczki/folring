

import React, { Component } from 'react';


export default class Room extends Component {

	joinRoom() {
		const user = this.props.user;
		window.socket.emit('join_room', {room: this.props.roomId, user});
		this.props.history.push('/Folring');
	}

	render() {
		return (
			<div onClick={this.joinRoom.bind(this)} className="room">
				{this.props.roomId}
			</div>
		);
	}
}
