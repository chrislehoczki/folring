

import React, { Component } from 'react';

import Message from './Message';
import MessageInput from './MessageInput';

import { emit } from '../../../actions/socket';


export default class Messaging extends Component {
	constructor(props) {
		super(props);
	
		this.sendMessage = this.sendMessage.bind(this);
		this.addMessage = this.addMessage.bind(this);
	}

	addMessage(message) {
		const messages = [...this.state.messages, message];
		this.setState({messages})
	}


	sendMessage(message) {	
		const messageConfig =  {room: this.props.room._id, message: message, user: this.props.user.facebook ? this.props.user.facebook.displayName : this.props.user.username }
		emit('message', messageConfig);
	}

	render() {
		console.log('ROOM MESSAGES', this.props.room.messages)
		const messages = this.props.room.messages.map((message, i) => <Message key={i} message={message.message}/>)

		return (
			<div id='messaging'>
				<MessageInput sendMessage={this.sendMessage} />
				{messages}
			</div>
		);
	}
}
