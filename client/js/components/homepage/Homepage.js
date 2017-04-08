
import React, { Component } from 'react';
import Room from './Room';

if (process.env.BROWSER) {
	require('./Homepage.css');
}

export default class Homepage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showRooms: this.props.user ? true : false
		}
	}

	render() {
		const rooms = this.props.rooms;
		
		let roomComponents = null;
		if (this.state.showRooms && rooms) {
			// const roomKeys = Object.keys(this.props.rooms);
			// roomComponents = roomKeys.map((roomId) => <Room user={this.props.user} key={roomId} room={this.props.rooms[roomId]} history={this.props.history}/>)
		} 

		return (
			<div className="homepage">
				<h1>The App</h1>
				{roomComponents}
			</div>
		);
	}
}
