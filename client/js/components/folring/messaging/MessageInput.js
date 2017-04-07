

import React, { Component } from 'react';

export default class MessageInput extends Component {

	sendMessage() {
		const value = this.refs.input.value;
		console.log('sending message');
		this.props.sendMessage(value);
	}

	render() {
		return (
			<div id="message-input">
				<input ref="input" placeholder="message" />
				<button onClick={this.sendMessage.bind(this)} />
			</div>
		);
	}
}
