
import React, { Component } from 'react';
import Messaging from './messaging/Messaging';
import Game from './game/Game.js';
require('./Tolring.css');

export default class Tolring extends Component {

	componentWillUnmount() {
		window.socket.emit('leave_room');
	}

	render() {
		return (
			<div>
				<h1>Tolring lives!</h1>
				<Game />
				<Messaging />
			</div>
		);
	}
}
