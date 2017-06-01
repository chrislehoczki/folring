'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Homepage = require('./homepage/Homepage');

var _Homepage2 = _interopRequireDefault(_Homepage);

var _Profile = require('./profile/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _Folring = require('./folring/Folring');

var _Folring2 = _interopRequireDefault(_Folring);

var _Nav = require('./nav/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _Login = require('./login/Login');

var _Login2 = _interopRequireDefault(_Login);

var _SignupModal = require('./login/SignupModal');

var _SignupModal2 = _interopRequireDefault(_SignupModal);

var _RouteWrapper = require('./animations/RouteWrapper');

var _RouteWrapper2 = _interopRequireDefault(_RouteWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      rooms: null,
      user: null
    };

    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // window.socket.on('update_room', (room) => {
      //   const newRooms = { ...this.state.rooms };
      //   newRooms[room.id] = room;
      //   this.setState({rooms: newRooms});
      // });

      // window.socket.on('send_all_rooms', (rooms) => {
      //   this.setState({rooms: rooms})
      // });

      // window.socket.on('user', (user) => {
      //   this.setState({user: user});
      // });

    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactRouterDom.Route, { path: '*', component: _Nav2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Login2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/signup', component: _SignupModal2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/rooms', component: _Homepage2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/room/:roomId?', component: _Folring2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/profile', component: _Profile2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/folring', component: _Folring2.default })
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;