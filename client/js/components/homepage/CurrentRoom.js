

import React, { Component } from 'react';
import MiniFolring from '../minifolring/MiniFolring';

import { emit } from '../../actions/socket';

export default class Room extends Component {

	joinRoom() {
		emit('join_room', {roomId: this.props.room._id, role: 'player'});
		this.props.history.push(`/room/${this.props.room._id}`);
	}

	leaveRoom() {
		emit('leave_room', { roomId: this.props.room._id, role: 'player' })
		this.props.loadCurrentRoom(null);
		this.props.history.push(`/rooms`);
	}

	render() {
		const room = this.props.room;
		return (
			<div className="room">
				<p>{room.name}</p>
				{/*<MiniFolring room={room}/>*/}
				<div className="roomInfo">
					<div className="roomID" style={{ display: 'none' }}>{room.id}</div>
					{room.players[0] ? <div className="avatar black" title={room.players[0].username}></div> : <button className="play black" title="Play as black" onClick={this.joinRoom.bind(this, 0)}></button>}
					{room.players[1] ? <div className="avatar white" title={room.players[1].username}></div> : <button className="play white" title="Play as white" onClick={this.joinRoom.bind(this, 1)}></button>}
					<button title={'rejoin room'} onClick={this.joinRoom.bind(this)}>Rejoin Room</button>
					<button title={'leave room'} onClick={this.leaveRoom.bind(this)}>Leave Room</button>
				</div>
			</div>
		);
	}
}

