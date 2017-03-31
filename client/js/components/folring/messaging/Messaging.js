

import React, { Component } from 'react';

import Message from './Message';
import MessageInput from './MessageInput';


export default class Messaging extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [{user: 'admin', message: 'You can speak to eachother here.'}]
		}
		this.addMessage = this.addMessage.bind(this);

		
	}


	componentDidMount() {
		window.socket.on('message', (message) => {
			console.log('RECEIVED MESSAGE', message)
			const messages = [...this.state.messages, message];
			console.log('NEW MESSAGES')
			this.setState({messages}, () => {
				console.log(this.state.messages)
			})
	 	});
	}



	addMessage(message) {		
		window.socket.emit('message', message, this.props.user );
	}

	render() {

		const messages = this.state.messages.map((message, i) => <Message key={i} message={message.message}/>)

		return (
			<div id='messaging'>
			{messages}
			<MessageInput addMessage={this.addMessage} />
			</div>
		);
	}
}
