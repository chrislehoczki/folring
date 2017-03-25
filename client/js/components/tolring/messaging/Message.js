

import React, { Component } from 'react';

export default class Message extends Component {
	render() {
		return (
			<p>{this.props.message}</p>
		);
	}
}
