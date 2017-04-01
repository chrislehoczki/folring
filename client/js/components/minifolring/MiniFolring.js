

import React, { Component } from 'react';
import Game from '../folring/game/Game';

require('./MiniFolring.css');

export default class MiniFolring extends Component {
	render() {
		return (
				<div className="mini-folring-holder">
					<Game sendGame={this.sendGame} room={this.props.room}/>
				</div>
			
		);
	}
}
