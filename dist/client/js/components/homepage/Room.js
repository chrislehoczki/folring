'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MiniFolring = require('../minifolring/MiniFolring');

var _MiniFolring2 = _interopRequireDefault(_MiniFolring);

var _socket = require('../../actions/socket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function (_Component) {
	_inherits(Room, _Component);

	function Room() {
		_classCallCheck(this, Room);

		return _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).apply(this, arguments));
	}

	_createClass(Room, [{
		key: 'joinRoom',
		value: function joinRoom(playerNo, e) {
			console.log(this.props);
			(0, _socket.emit)('join_room', { roomId: this.props.room._id, role: 'player' });
			this.props.history.push('/room/' + this.props.room._id);
		}
	}, {
		key: 'spectateRoom',
		value: function spectateRoom() {
			var user = this.props.user;
			(0, _socket.emit)('join_room', { roomId: this.props.room._id, role: 'spectator' });
			this.props.history.push('/folring?userType=spectator');
		}
	}, {
		key: 'render',
		value: function render() {
			var room = this.props.room;
			return _react2.default.createElement(
				'div',
				{ className: 'room' },
				_react2.default.createElement(
					'p',
					null,
					room.name
				),
				_react2.default.createElement(_MiniFolring2.default, { room: room }),
				_react2.default.createElement(
					'div',
					{ className: 'roomInfo' },
					_react2.default.createElement(
						'div',
						{ className: 'roomID', style: { display: 'none' } },
						room.id
					),
					room.players[0] ? _react2.default.createElement('div', { className: 'avatar black', title: room.players[0].username }) : _react2.default.createElement('button', { className: 'play black', title: 'Play as black', onClick: this.joinRoom.bind(this, 0) }),
					room.players[1] ? _react2.default.createElement('div', { className: 'avatar white', title: room.players[1].username }) : _react2.default.createElement('button', { className: 'play white', title: 'Play as white', onClick: this.joinRoom.bind(this, 1) })
				)
			);
		}
	}]);

	return Room;
}(_react.Component);

exports.default = Room;