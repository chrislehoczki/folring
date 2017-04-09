
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Room from './Room';

import { listRooms } from '../../actions/rooms';

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
		this.props.listRooms();
	}

	render() {
		const rooms = this.props.rooms;
		
		let roomComponents = null;
		if (rooms) {
			roomComponents = rooms.map((room) => <Room {...this.props} key={room._id} room={room} />)
		} 

		return (
			<div className="homepage">
				<h1>The App</h1>
				{roomComponents}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    	rooms: state.mainRooms
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listRooms
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);;
