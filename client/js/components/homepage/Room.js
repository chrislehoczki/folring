

import React, { Component } from 'react';
import MiniFolring from '../minifolring/MiniFolring';

import { emit } from '../../actions/socket';

export default class Room extends Component {

	joinRoom(playerNo, e) {
		console.log(this.props);
		emit('join_room', {roomId: this.props.room._id, role: 'player'});
		this.props.history.push(`/room/${this.props.room._id}`);
	}

	spectateRoom() {
		const user = this.props.user;
		emit('join_room', {roomId: this.props.room._id, role: 'spectator'});
		this.props.history.push('/folring?userType=spectator');
	}

	render() {
		const room = this.props.room;
		return (
			<div className="room">
				<p>{room.name}</p>
				<MiniFolring room={room}/>
				<div className="roomInfo">
					<div className="roomID" style={{ display: 'none' }}>{room.id}</div>
					{room.players[0] ? <div className="avatar black" title={room.players[0].username}></div> : <button className="play black" title="Play as black" onClick={this.joinRoom.bind(this, 0)}></button>}
					{room.players[1] ? <div className="avatar white" title={room.players[1].username}></div> : <button className="play white" title="Play as white" onClick={this.joinRoom.bind(this, 1)}></button>}
					{/*<button className="spectate" title={`${this.props.room.spectators.length} spectators`} onClick={this.spectateRoom.bind(this)}><span>{this.props.room.spectators.length}</span></button>*/}
				</div>
			</div>
		);
	}
}

