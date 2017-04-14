

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRoom, deleteRoom } from '../../actions/room_management';

import SingleRoom from './SingleRoom';

class Profile extends Component {

	addRoom() {
		this.props.addRoom(this.refs.roomName.value)
	}

	deleteRoom(roomId) {
		this.props.deleteRoom(roomId)
	}

	render() {

		let ownedRooms, ownedRoomsComponents;

		if (this.props.user) {
			ownedRooms = this.props.user.ownedRooms;
			ownedRoomsComponents = ownedRooms.map((room) => <SingleRoom room={room} deleteRoom={this.deleteRoom.bind(this)} />)
		}

		const displayName = this.props.user.facebook ? this.props.user.facebook.displayName : this.props.user.username;
		
		const wins = this.props.user.wins || 0;
		const losses = this.props.user.losses || 0;
		let winPercentage = (100 / (wins + losses)) * wins || 0;
		winPercentage = winPercentage.toFixed(1)
		return (
			<div>
				<h1>Profile</h1>
				<p>Name: {displayName}</p>
				<p>Wins: {wins}</p>
				<p>Losses: {losses}</p>
				<p>Win Rate: {winPercentage}%</p>

				<h2> Owned Rooms </h2>
				<input ref="roomName" placeholder="add room" />
				<button onClick={this.addRoom.bind(this)}>Add</button>
				{ownedRoomsComponents}
			</div>

		);
	}
}

const mapStateToProps = (state) => {
    return {
    	user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addRoom,
        deleteRoom
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);;
