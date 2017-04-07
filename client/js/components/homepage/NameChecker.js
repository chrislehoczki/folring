

import React, { Component } from 'react';

export default class NameChecker extends Component {

	constructor(props) {
		super(props);
		this.addUser = this.addUser.bind(this);
		this.state = {
			username: 'Hey'
		}
	}

	addUser(e) {
		this.setState({username: e.target.value});
	}

	updateUserName() {
		const user = {username: this.state.username};
		socket.emit("connection", user);
		this.props.goToRooms();
	}

	render() {
		return (
			<div className="nameChecker">
				<h2> What is your name? </h2>
				<input value={this.state.user} onChange={this.addUser}></input>
				<button className="join" onClick={this.updateUserName.bind(this)}>Select Game Room</button>
			</div>
		);
	}
}
