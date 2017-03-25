

import React, { Component } from 'react';


export default class Room extends Component {

	joinRoom() {
		// const user = window.localStorage.user;
		const user = window.user;
		window.socket.emit('join_room', {room: this.props.roomId, user});
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
