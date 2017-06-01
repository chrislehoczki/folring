'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Users = function (_Component) {
	_inherits(Users, _Component);

	function Users() {
		_classCallCheck(this, Users);

		return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
	}

	_createClass(Users, [{
		key: 'render',
		value: function render() {
			console.log('PLAYERS', this.props.players);
			var players = null;
			var spectators = null;
			if (this.props.players) {
				players = this.props.players.map(function (user, i) {
					return _react2.default.createElement(_User2.default, { userType: 'player', key: i, number: i, user: user.facebook ? user.facebook.displayName : user.username });
				});
			}

			if (this.props.spectators) {
				spectators = this.props.spectators.map(function (user, i) {
					return _react2.default.createElement(_User2.default, { userType: 'spectator', key: i, number: i, user: user.facebook ? user.facebook.displayName : user.username });
				});
			}

			return _react2.default.createElement(
				'div',
				{ id: 'users' },
				players
			);
		}
	}]);

	return Users;
}(_react.Component);

exports.default = Users;