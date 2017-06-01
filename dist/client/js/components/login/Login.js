'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _reactRouterDom = require('react-router-dom');

var _auth = require('../../actions/auth');

var _ui = require('../../actions/ui');

var _LoginModal = require('./LoginModal');

var _LoginModal2 = _interopRequireDefault(_LoginModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process && process.env && process.env.BROWSER || undefined) {
	require('./Login.css');
}

var io = require('socket.io-client');

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login() {
		_classCallCheck(this, Login);

		return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
	}

	_createClass(Login, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (window.localStorage.apitoken) {
				this.props.authenticateToken(window.localStorage.apitoken);
			} else {
				this.props.updateUI({ login: true });
			}

			var query = _queryString2.default.parse(this.props.location.search);

			if (query.apitoken) {
				window.localStorage.setItem('apitoken', query.apitoken);
				this.props.authenticateToken(query.apitoken);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'login' },
				this.props.ui.login ? _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'a',
						{ className: 'fbook-login', href: '/auth/facebook' },
						_react2.default.createElement('img', { src: '/client/images/fb.png' }),
						_react2.default.createElement(
							'p',
							null,
							'Login With Facebook'
						)
					),
					_react2.default.createElement(_LoginModal2.default, { loginUser: this.props.loginUser }),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/signup' },
						_react2.default.createElement(
							'button',
							{ title: 'signup' },
							'Signup Instead'
						)
					)
				) : null,
				this.props.user ? _react2.default.createElement(_reactRouterDom.Redirect, { to: {
						pathname: '/rooms',
						state: { from: this.props.location }
					} }) : null
			);
		}
	}]);

	return Login;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user,
		ui: state.ui
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		authenticateToken: _auth.authenticateToken,
		loginUser: _auth.loginUser,
		updateUI: _ui.updateUI
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);
;