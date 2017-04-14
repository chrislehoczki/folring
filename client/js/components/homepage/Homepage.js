
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Room from './Room';
import CurrentRoom from './CurrentRoom';

import { listRooms, loadCurrentRoom } from '../../actions/rooms';

if (process.env.BROWSER) {
	require('./Homepage.css');
}

class Homepage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showRooms: this.props.user ? true : false
		}
	}

	componentDidMount() {
		this.refreshRooms();
	}

	refreshRooms() {
		this.props.listRooms();
	}

	render() {
		const rooms = this.props.rooms;
		
		let roomComponents = null;
		if (rooms) {
			roomComponents = rooms.map((room) => <Room {...this.props} key={room._id} room={room} />)
		} 

		let currentRoom = null;
		
		if (this.props.currentRoom) {
			currentRoom = <CurrentRoom {...this.props} loadCurrentRoom={this.props.loadCurrentRoom} room={this.props.currentRoom} />
		}

		return (
			<div className="homepage">
				<button onClick={this.refreshRooms.bind(this)}>Refresh Rooms</button>
				<h1> Current Room </h1>
				{ currentRoom }
				<h1> All Rooms </h1>
				{roomComponents}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    	rooms: state.mainRooms,
    	currentRoom: state.currentRoom,
    	user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listRooms,
        loadCurrentRoom
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);;
