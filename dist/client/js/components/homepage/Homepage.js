'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

var _CurrentRoom = require('./CurrentRoom');

var _CurrentRoom2 = _interopRequireDefault(_CurrentRoom);

var _rooms = require('../../actions/rooms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process && process.env && process.env.BROWSER || undefined) {
	require('./Homepage.css');
}

var Homepage = function (_Component) {
	_inherits(Homepage, _Component);

	function Homepage(props) {
		_classCallCheck(this, Homepage);

		var _this = _possibleConstructorReturn(this, (Homepage.__proto__ || Object.getPrototypeOf(Homepage)).call(this, props));

		_this.state = {
			showRooms: _this.props.user ? true : false
		};
		return _this;
	}

	_createClass(Homepage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.refreshRooms();
		}
	}, {
		key: 'refreshRooms',
		value: function refreshRooms() {
			this.props.listRooms();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var rooms = this.props.rooms;

			var roomComponents = null;
			if (rooms) {
				roomComponents = rooms.map(function (room) {
					return _react2.default.createElement(_Room2.default, _extends({}, _this2.props, { key: room._id, room: room }));
				});
			}

			var currentRoom = null,
			    currentRooms = [];

			if (this.props.user) {
				currentRooms = this.props.user.playingRooms.map(function (room) {
					return _react2.default.createElement(_CurrentRoom2.default, _extends({}, _this2.props, { loadCurrentRoom: _this2.props.loadCurrentRoom, room: room }));
				});
			}
			// if (this.props.currentRoom) {
			// 	currentRoom = <CurrentRoom {...this.props} loadCurrentRoom={this.props.loadCurrentRoom} room={this.props.currentRoom} />
			// }

			return _react2.default.createElement(
				'div',
				{ className: 'homepage' },
				_react2.default.createElement(
					'button',
					{ onClick: this.refreshRooms.bind(this) },
					'Refresh Rooms'
				),
				_react2.default.createElement(
					'h1',
					null,
					' Current Playing Rooms '
				),
				currentRooms,
				_react2.default.createElement(
					'h1',
					null,
					' All Rooms '
				),
				roomComponents
			);
		}
	}]);

	return Homepage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		rooms: state.mainRooms,
		currentRoom: state.currentRoom,
		user: state.user
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return (0, _redux.bindActionCreators)({
		listRooms: _rooms.listRooms,
		loadCurrentRoom: _rooms.loadCurrentRoom
	}, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Homepage);
;