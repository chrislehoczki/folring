
import React, { Component } from 'react';
export default class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            email: '',
            userMessage: null
        };
    }

    changeEmail(e) {
        this.setState({email: e.target.value});
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    checkEmail() {
        // email
        const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

        const emailTest = this.state.email.match(emailRegex);
        if (!emailTest) {
            this.setState({userMessage: "Invalid email"});
        } else {
            this.setState({userMessage: null});
        }
        return emailTest;
    }

    checkPassword() {
        if (this.state.password) {
            this.setState({userMessage: null});
            return true;
        } else {
            this.setState({userMessage: "No password"});
            return false;
        }
    }

    signinUser() {
        console.log('LOG IN FROM HERE')
        this.props.loginUser({email: this.state.email, password: this.state.password})
    }

    render() {
        const errorStyle = {
            fontSize: '16px', color: '#E74476'
        };

        return (
            <div id="local-login">
                <div className="content">
                    <div>
                        <p>Email</p>
                        <input onChange={this.changeEmail.bind(this)} type="email" placeholder="email" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
                        <p>Password</p>
                        <input onChange={this.changePassword.bind(this)} placeholder="password" type="password" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
                        <button onClick={this.signinUser.bind(this)}>Login</button>
                        { this.state.userMessage ? <p style={errorStyle}> { this.state.userMessage } </p> : null}
                    </div>
                </div>
            </div>
        );
    }
}
