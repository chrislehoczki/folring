
import React, { Component } from 'react';
import Room from './Room';
import NameChecker from './NameChecker.js';

require('./Homepage.css');

export default class Homepage extends Component {

	constructor(props) {
		super(props);
		// const user = window.localStorage.user;
		const user = window.user;
		this.state = {
			nameChecker: user ? false : true,
			rooms: user ? true: false
		}
		this.goToRooms = this.goToRooms.bind(this);
	}

	goToRooms() {
		this.setState({nameChecker: false, rooms: true})
	}

	render() {
		const rooms = [0, 1, 2, 3, 4];

		const roomComponents = rooms.map((room) => <Room key={room} roomId={`room_${room + 1}`} history={this.props.history}/>)

		return (
			<div>
				{this.state.nameChecker ? <NameChecker goToRooms={this.goToRooms} /> : null }
				{this.state.rooms ? roomComponents : null}
			</div>
		);
	}
}
