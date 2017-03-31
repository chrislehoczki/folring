
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
			showNameChecker: user ? false : true,
			showRooms: user ? true: false
		}
		this.goToRooms = this.goToRooms.bind(this);
	}

	

	goToRooms() {
		this.setState({showNameChecker: false, showRooms: true})
	}

	render() {
		const rooms = this.props.rooms;
		
		let roomComponents = null;
		if (this.state.showRooms && rooms) {
			const roomKeys = Object.keys(this.state.rooms);
			roomComponents = roomKeys.map((roomId) => <Room key={roomId} roomId={roomId} history={this.props.history}/>)
		} 

		if (!rooms) {
			roomComponents = <h1>Populating Rooms</h1>
		}

		return (
			<div>
				{this.state.showNameChecker ? <NameChecker goToRooms={this.goToRooms} /> : null }
				{roomComponents}
			</div>
		);
	}
}
