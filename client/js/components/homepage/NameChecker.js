

import React, { Component } from 'react';

export default class NameChecker extends Component {

	constructor(props) {
		super(props);
		this.addUser = this.addUser.bind(this);
	}

	addUser(e) {
		// window.localStorage.setItem('user', e.target.value)
		window.user = e.target.value;
	}

	render() {
		return (
			<div>
				<h2> What is your name? </h2>
				<input onChange={this.addUser}></input>
				<button className="join" onClick={this.props.goToRooms}>Select Game Room</button>
			</div>
		);
	}
}
