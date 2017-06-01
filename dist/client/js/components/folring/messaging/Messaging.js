'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _MessageInput = require('./MessageInput');

var _MessageInput2 = _interopRequireDefault(_MessageInput);

var _socket = require('../../../actions/socket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messaging = function (_Component) {
	_inherits(Messaging, _Component);

	function Messaging(props) {
		_classCallCheck(this, Messaging);

		var _this = _possibleConstructorReturn(this, (Messaging.__proto__ || Object.getPrototypeOf(Messaging)).call(this, props));

		_this.sendMessage = _this.sendMessage.bind(_this);
		_this.addMessage = _this.addMessage.bind(_this);
		return _this;
	}

	_createClass(Messaging, [{
		key: 'addMessage',
		value: function addMessage(message) {
			var messages = [].concat(_toConsumableArray(this.state.messages), [message]);
			this.setState({ messages: messages });
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(message) {
			var messageConfig = { room: this.props.room._id, message: message, user: this.props.user.facebook ? this.props.user.facebook.displayName : this.props.user.username };
			(0, _socket.emit)('message', messageConfig);
		}
	}, {
		key: 'render',
		value: function render() {
			console.log('ROOM MESSAGES', this.props.room.messages);
			var messages = this.props.room.messages.map(function (message, i) {
				return _react2.default.createElement(_Message2.default, { key: i, message: message.message });
			});

			return _react2.default.createElement(
				'div',
				{ id: 'messaging' },
				_react2.default.createElement(_MessageInput2.default, { sendMessage: this.sendMessage }),
				messages
			);
		}
	}]);

	return Messaging;
}(_react.Component);

exports.default = Messaging;