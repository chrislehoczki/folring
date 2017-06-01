'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _socket = require('../../actions/socket');

var _Messaging = require('./messaging/Messaging');

var _Messaging2 = _interopRequireDefault(_Messaging);

var _Game = require('./game/Game.js');

var _Game2 = _interopRequireDefault(_Game);

var _Users = require('./users/Users.js');

var _Users2 = _interopRequireDefault(_Users);

var _Notification = require('./messaging/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _rooms = require('../../actions/rooms');

var _notifications = require('../../actions/notifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process && process.env && process.env.BROWSER || undefined) {
	require('./Folring.css');
}

var Folring = function (_Component) {
	_inherits(Folring, _Component);

	function Folring(props) {
		_classCallCheck(this, Folring);

		var _this = _possibleConstructorReturn(this, (Folring.__proto__ || Object.getPrototypeOf(Folring)).call(this, props));

		_this.query = _queryString2.default.parse(_this.props.location.search);
		_this.sendGame = _this.sendGame.bind(_this);
		return _this;
	}

	_createClass(Folring, [{
		key: 'leaveGame',
		value: function leaveGame() {
			(0, _socket.emit)('leave_room', { roomId: this.props.currentRoom._id, role: 'player' });
			this.props.loadCurrentRoom(null);
			this.props.history.push('/');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var params = this.props.match.params;
			// get initial state of folring room
			this.props.getCurrentRoom(params.roomId);

			// 	window.addEventListener("beforeunload", (ev) => 
			// {  
			//     ev.preventDefault();
			//     window.socket.emit('leave_room', {user: window.user});
			//     return ev.returnValue = 'Are you sure you want to close?';
			// });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'sendGame',
		value: function sendGame(game) {
			(0, _socket.emit)('update_room_game', { roomId: this.props.currentRoom._id, game: game });
		}
	}, {
		key: 'render',
		value: function render() {
			console.log('NOTIFICATION', this.props.notification);
			return _react2.default.createElement(
				'div',
				{ className: 'game-holder' },
				_react2.default.createElement('button', { className: 'leaveGame', onClick: this.leaveGame.bind(this) }),
				this.props.currentRoom ? _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_Users2.default, { players: this.props.currentRoom.players, spectators: this.props.currentRoom.spectators }),
					_react2.default.createElement(
						'div',
						{ className: 'folring-holder' },
						_react2.default.createElement(_Game2.default, { sendGame: this.sendGame, room: this.props.currentRoom, user: this.props.user }),
						'}'
					),
					_react2.default.createElement(_Messaging2.default, { user: this.props.user, room: this.props.currentRoom }),
					this.props.notification.show ? _react2.default.createElement(_Notification2.default, { notification: this.props.notification }) : null
				) : null
			);
		}
	}]);

	return Folring;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		currentRoom: state.currentRoom,
		user: state.user,
		notification: state.notification
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		getCurrentRoom: _rooms.getCurrentRoom,
		loadCurrentRoom: _rooms.loadCurrentRoom,
		toggleNotification: _notifications.toggleNotification
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Folring);
;