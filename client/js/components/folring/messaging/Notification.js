
import React, { Component } from 'react';

export default class Notification extends Component {
	render() {
		return (
			<div className="notification">
				{this.props.notification.show ? <div>{this.props.notification.notification}</div> : null }
			</div>
		);
	}
}
