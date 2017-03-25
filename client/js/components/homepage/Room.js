

import React, { Component } from 'react';


export default class Room extends Component {

	joinRoom() {
		window.socket.emit('join_room', {room: this.props.roomId, user: window.user});
		this.props.history.push('/tolring');
	}

	render() {
		return (
			<div onClick={this.joinRoom.bind(this)} className="room">
				{this.props.roomId}
			</div>
		);
	}
}
