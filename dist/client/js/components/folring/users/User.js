'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Component) {
	_inherits(User, _Component);

	function User() {
		_classCallCheck(this, User);

		return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
	}

	_createClass(User, [{
		key: 'render',
		value: function render() {
			var user = this.props.user;
			var content = null;
			console.log(this.props);
			if (this.props.userType === 'player') {
				content = 'Player ' + this.props.number + ': ' + this.props.user;
			} else {
				content = 'Spectator ' + this.props.number + ': ' + this.props.user;
			}

			var userClass = void 0;
			if (this.props.number === 0) {
				userClass = "user black";
			} else if (this.props.number === 1) {
				userClass = "user white";
			} else {
				userClass = "user";
			}

			return _react2.default.createElement(
				'div',
				{ className: userClass },
				this.props.user
			);
		}
	}]);

	return User;
}(_react.Component);

exports.default = User;