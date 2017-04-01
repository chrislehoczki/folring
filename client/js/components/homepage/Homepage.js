
import React, { Component } from 'react';
import Room from './Room';
import NameChecker from './NameChecker.js';

require('./Homepage.css');

export default class Homepage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showNameChecker: this.props.user ? false : true,
			showRooms: this.props.user ? true : false
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
			const roomKeys = Object.keys(this.props.rooms);
			roomComponents = roomKeys.map((roomId) => <Room user={this.props.user} key={roomId} room={this.props.rooms[roomId]} history={this.props.history}/>)
		} 

		return (
			<div>
				{this.state.showNameChecker ? <NameChecker goToRooms={this.goToRooms} /> : null }
				{roomComponents}
			</div>
		);
	}
}
