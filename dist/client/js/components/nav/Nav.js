'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _auth = require('../../actions/auth');

var _ui = require('../../actions/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process && process.env && process.env.BROWSER || undefined) {
	require('./Nav.css');
}

var Nav = function (_Component) {
	_inherits(Nav, _Component);

	function Nav() {
		_classCallCheck(this, Nav);

		return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
	}

	_createClass(Nav, [{
		key: 'logout',
		value: function logout() {
			this.props.logoutUser();
			this.props.updateUI({ login: true });
			this.props.history.push('/');
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.props.user ? _react2.default.createElement(
					'div',
					{ className: 'nav' },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/rooms' },
						_react2.default.createElement('button', { className: 'home', title: 'home' })
					),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/profile' },
						_react2.default.createElement('button', { className: 'profile', title: 'profile' })
					),
					_react2.default.createElement(
						'button',
						{ className: 'logout', onClick: this.logout.bind(this) },
						'Logout'
					)
				) : null
			);
		}
	}]);

	return Nav;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		logoutUser: _auth.logoutUser,
		updateUI: _ui.updateUI
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Nav);
;