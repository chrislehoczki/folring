'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _room_management = require('../../actions/room_management');

var _SingleRoom = require('./SingleRoom');

var _SingleRoom2 = _interopRequireDefault(_SingleRoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_Component) {
	_inherits(Profile, _Component);

	function Profile() {
		_classCallCheck(this, Profile);

		return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
	}

	_createClass(Profile, [{
		key: 'addRoom',
		value: function addRoom() {
			this.props.addRoom(this.refs.roomName.value);
		}
	}, {
		key: 'deleteRoom',
		value: function deleteRoom(roomId) {
			this.props.deleteRoom(roomId);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var ownedRooms = void 0,
			    ownedRoomsComponents = void 0;

			if (this.props.user) {
				ownedRooms = this.props.user.ownedRooms;
				ownedRoomsComponents = ownedRooms.map(function (room) {
					return _react2.default.createElement(_SingleRoom2.default, { room: room, deleteRoom: _this2.deleteRoom.bind(_this2) });
				});
			}

			var displayName = this.props.user.facebook ? this.props.user.facebook.displayName : this.props.user.username;

			var wins = this.props.user.wins || 0;
			var losses = this.props.user.losses || 0;
			var winPercentage = 100 / (wins + losses) * wins || 0;
			winPercentage = winPercentage.toFixed(1);
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Profile'
				),
				_react2.default.createElement(
					'p',
					null,
					'Name: ',
					displayName
				),
				_react2.default.createElement(
					'p',
					null,
					'Wins: ',
					wins
				),
				_react2.default.createElement(
					'p',
					null,
					'Losses: ',
					losses
				),
				_react2.default.createElement(
					'p',
					null,
					'Win Rate: ',
					winPercentage,
					'%'
				),
				_react2.default.createElement(
					'h2',
					null,
					' Owned Rooms '
				),
				_react2.default.createElement('input', { ref: 'roomName', placeholder: 'add room' }),
				_react2.default.createElement(
					'button',
					{ onClick: this.addRoom.bind(this) },
					'Add'
				),
				ownedRoomsComponents
			);
		}
	}]);

	return Profile;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		addRoom: _room_management.addRoom,
		deleteRoom: _room_management.deleteRoom
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Profile);
;