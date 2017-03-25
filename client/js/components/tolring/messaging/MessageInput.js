

import React, { Component } from 'react';

export default class MessageInput extends Component {

	addMessage() {
		const value = this.refs.input.value;
		this.props.addMessage(value);
	}

	render() {
		return (
			<div id="message-input">
				<input ref="input" />
				<button onClick={this.addMessage.bind(this)} />
			</div>
		);
	}
}
