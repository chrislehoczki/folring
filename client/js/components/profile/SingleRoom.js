

import React, { Component } from 'react';

export default class SingleRoom extends Component {


	deleteRoom() {
		this.props.deleteRoom(this.props.room._id);
	}

	render() {
		return (
			<div>
				<p>{this.props.room.name}</p>
				<button onClick={this.deleteRoom.bind(this)}>X</button>
			</div>
		);
	}
}
