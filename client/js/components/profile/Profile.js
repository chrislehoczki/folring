

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Profile extends Component {
	render() {
		console.log(this.props.user)
		return (
			<div>
				<h1>Profile</h1>
				<p>{this.props.user.facebook.displayName}</p>
			</div>

		);
	}
}

const mapStateToProps = (state) => {
    return {
    	user: state.user
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         listRooms
//     }, dispatch);
// };

export default connect(mapStateToProps)(Profile);;
