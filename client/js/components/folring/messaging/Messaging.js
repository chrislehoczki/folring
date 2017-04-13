

import React, { Component } from 'react';

import Message from './Message';
import MessageInput from './MessageInput';


export default class Messaging extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [{user: 'admin', message: 'You can speak to eachother here.'}]
		}
		this.sendMessage = this.sendMessage.bind(this);
		this.addMessage = this.addMessage.bind(this);
	}


	componentDidMount() {
		window.socket.on('message', this.addMessage);
	}

	addMessage(message) {
		const messages = [...this.state.messages, message];
		this.setState({messages})
	}


	componentWillUnmount() {
		window.socket.removeListener('message', this.addMessage)
	}


	sendMessage(message) {	
		console.log('EMITTING MESSAGE')	
		window.socket.emit('message', message, this.props.user );
	}

	render() {

		const messages = this.state.messages.map((message, i) => <Message key={i} message={message.message}/>)

		return (
			<div id='messaging'>
				<MessageInput sendMessage={this.sendMessage} />
				{messages}
			</div>
		);
	}
}
