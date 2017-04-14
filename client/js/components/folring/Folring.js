
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { emit } from '../../actions/socket';

import Messaging from './messaging/Messaging';
import Game from './game/Game.js';
import Users from './users/Users.js';

import queryString from 'query-string';

import { getCurrentRoom, loadCurrentRoom } from '../../actions/rooms';

if (process.env.BROWSER) {
  require('./Folring.css');
}

class Folring extends Component {

	constructor(props) {
		super(props);
		this.query = queryString.parse(this.props.location.search);
		this.sendGame = this.sendGame.bind(this);
	}
	
	leaveGame() {
		emit('leave_room', { roomId: this.props.currentRoom._id, role: 'player' })
		this.props.loadCurrentRoom(null);
		this.props.history.push('/');
	}

	componentDidMount() {
		const params = this.props.match.params		
		 // get initial state of folring room
		this.props.getCurrentRoom(params.roomId);

	 // 	window.addEventListener("beforeunload", (ev) => 
		// {  
		//     ev.preventDefault();
		//     window.socket.emit('leave_room', {user: window.user});
		//     return ev.returnValue = 'Are you sure you want to close?';
		// });
	}


	componentWillUnmount() {
		this.mounted = false;
	}

	sendGame(game) {
		emit('update_room_game', { roomId: this.props.currentRoom._id, game: game})
	}

	render() {
		return (
			<div className="game-holder">
				<button className="leaveGame" onClick={this.leaveGame.bind(this)}></button>
				{ this.props.currentRoom ?
				<div>
					<Users players={this.props.currentRoom.players} spectators={this.props.currentRoom.spectators}/>
					<div className="folring-holder">
						<Game sendGame={this.sendGame} room={this.props.currentRoom} user={this.props.user}/>}
					</div>	
					{/*<Messaging user={this.props.user} />*/}
				</div>
				: null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    	currentRoom: state.currentRoom,
    	user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCurrentRoom,
        loadCurrentRoom
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Folring);;
