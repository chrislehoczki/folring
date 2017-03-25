

import React, { Component } from 'react';

import Message from './Message';
import MessageInput from './MessageInput';


export default class Messaging extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [{user: 'Chris', msg: 'hey'}, {user: 'Miika', msg: 'hey back to you'}]
		}
		this.user = 'Chris';
		this.addMessage = this.addMessage.bind(this);

		
	}

	componentDidMount() {
		window.socket.on('message', (message) => {
			console.log('MESSAGE RECEIVED', message);
			const config = {user: this.user, msg: message}
			const messages = [...this.state.messages, config];
			this.setState({messages})
	 	});
	}



	addMessage(message) {		
		window.socket.emit('message', message);
	}

	render() {

		const messages = this.state.messages.map((message, i) => <Message key={i} message={message.msg}/>)

		return (
			<div id='messaging'>

			{messages}
			<MessageInput addMessage={this.addMessage} />
			</div>
		);
	}
}
