'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouterDom = require('react-router-dom');

var _auth = require('../../actions/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_Component) {
	_inherits(Signup, _Component);

	function Signup(props) {
		_classCallCheck(this, Signup);

		var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

		_this.state = {
			password: '',
			email: '',
			username: null
		};
		return _this;
	}

	_createClass(Signup, [{
		key: 'changeEmail',
		value: function changeEmail(e) {
			this.setState({ email: e.target.value });
		}
	}, {
		key: 'changePassword',
		value: function changePassword(e) {
			this.setState({ password: e.target.value });
		}
	}, {
		key: 'changePasswordMatch',
		value: function changePasswordMatch(e) {
			this.setState({ passwordMatch: e.target.value });
		}
	}, {
		key: 'changeUsername',
		value: function changeUsername(e) {
			this.setState({ username: e.target.value });
		}
	}, {
		key: 'checkPasswordFormat',
		value: function checkPasswordFormat() {
			var passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(.{8,})$/;

			var passwordTest = this.state.password.match(passwordRegex);
			if (!passwordTest) {
				this.setState({ userMessage: "password invalid" });
			} else {
				this.setState({ userMessage: null });
			}
			return passwordTest;
		}
	}, {
		key: 'checkPasswordMatch',
		value: function checkPasswordMatch() {
			var match = this.state.password && this.state.passwordMatch && this.state.password === this.state.passwordMatch;
			if (!match) {
				this.setState({ userMessage: "passwords dont match" });
			} else {
				this.setState({ userMessage: null });
			}
			return match;
		}
	}, {
		key: 'checkEmail',
		value: function checkEmail() {
			// email
			var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

			var emailTest = this.state.email.match(emailRegex);
			if (!emailTest) {
				this.setState({ userMessage: "email not valid" });
			} else {
				this.setState({ userMessage: null });
			}
			return emailTest;
		}
	}, {
		key: 'signupUser',
		value: function signupUser() {
			console.log('Signup from here');
			this.props.signupUser({ username: this.state.username, email: this.state.email, password: this.state.password });
		}
	}, {
		key: 'render',
		value: function render() {

			var errorStyle = {
				fontSize: '16px', color: '#E74476'
			};

			return _react2.default.createElement(
				'div',
				{ className: 'signup' },
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'h2',
							null,
							'Signup'
						),
						_react2.default.createElement(
							'p',
							{ className: 'label' },
							' Username '
						),
						_react2.default.createElement('input', { onChange: this.changeUsername.bind(this), type: 'text', placeholder: 'username', autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }),
						_react2.default.createElement(
							'p',
							{ className: 'label' },
							' Email '
						),
						_react2.default.createElement('input', { onChange: this.changeEmail.bind(this), type: 'email', placeholder: 'email', onBlur: this.checkEmail.bind(this), autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }),
						_react2.default.createElement(
							'p',
							{ className: 'label' },
							' Password '
						),
						_react2.default.createElement('input', { onChange: this.changePassword.bind(this), type: 'password', placeholder: 'password', onBlur: this.checkPasswordFormat.bind(this), autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }),
						_react2.default.createElement(
							'p',
							{ className: 'label' },
							'Confirm Password'
						),
						_react2.default.createElement('input', { onChange: this.changePasswordMatch.bind(this), type: 'password', placeholder: 'confirmed password', onBlur: this.checkPasswordMatch.bind(this), autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }),
						_react2.default.createElement(
							'button',
							{ onClick: this.signupUser.bind(this) },
							'Signup'
						),
						this.state.userMessage ? _react2.default.createElement(
							'p',
							{ style: errorStyle },
							' ',
							this.state.userMessage,
							' '
						) : null,
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/' },
							_react2.default.createElement(
								'button',
								{ title: 'login' },
								'Login Instead'
							)
						),
						this.props.user ? _react2.default.createElement(_reactRouterDom.Redirect, { to: {
								pathname: '/rooms',
								state: { from: this.props.location }
							} }) : null
					)
				)
			);
		}
	}]);

	return Signup;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		signupUser: _auth.signupUser
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Signup);
;