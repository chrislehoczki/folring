
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Redirect, Link
} from 'react-router-dom';


import { signupUser } from '../../actions/auth';

class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			password: '', 
			email: '',
			username: null
		};
	}

	changeEmail(e) {
		this.setState({email: e.target.value});
	}

	changePassword(e) {
		this.setState({password: e.target.value});
	}

	changePasswordMatch(e) {
		this.setState({passwordMatch: e.target.value});
	}

	changeUsername(e) {
		this.setState({username: e.target.value});
	}

	checkPasswordFormat() {
		const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(.{8,})$/;

        const passwordTest = this.state.password.match(passwordRegex);
        if (!passwordTest) {
        	 this.setState({userMessage: "password invalid"})
        } else {
        	this.setState({userMessage: null});
        }
        return passwordTest;     
	}

	checkPasswordMatch() {
		const match = this.state.password && this.state.passwordMatch && this.state.password === this.state.passwordMatch;
		if (!match) {
			this.setState({userMessage: "passwords dont match"})
		} else {
			this.setState({userMessage: null});
		}
		return match;
	}


	checkEmail() {
		// email
		const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

        const emailTest = this.state.email.match(emailRegex);
        if (!emailTest) {
        	this.setState({userMessage: "email not valid"});
        } else {
        	this.setState({userMessage: null});
        }
        return emailTest;
	}


	signupUser() {
		console.log('Signup from here')
		this.props.signupUser({username: this.state.username, email: this.state.email, password: this.state.password})
	}

	render() {

		const errorStyle = {
			fontSize: '16px', color: '#E74476'
		};

		return (
			<div>
			    <div className="content">
			    	<div>
				        <h2>Signup</h2>
				        <p className="label"> Username </p>
				        <input onChange={this.changeUsername.bind(this)} type="text" placeholder="username" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
				        <p className="label"> Email </p>
				        <input onChange={this.changeEmail.bind(this)} type="email" placeholder="email" onBlur={this.checkEmail.bind(this)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
				        <p className="label"> Password </p>
				        <input onChange={this.changePassword.bind(this)} type="password" placeholder="password" onBlur={this.checkPasswordFormat.bind(this)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
				        <p className="label">Confirm Password</p>
				        <input onChange={this.changePasswordMatch.bind(this)} type="password" placeholder="confirmed password" onBlur={this.checkPasswordMatch.bind(this)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
				        <button onClick={this.signupUser.bind(this)} className="login">Signup</button>
				        { this.state.userMessage ? <p style={errorStyle}> { this.state.userMessage } </p> : null}
				      	<Link to="/"><button title="login">Login</button></Link>
				      	{this.props.user ?
							<Redirect to={{
						        pathname: '/rooms',
						        state: { from: this.props.location }
			      		}}/> : null }
					</div>
			    </div>
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
        signupUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);;