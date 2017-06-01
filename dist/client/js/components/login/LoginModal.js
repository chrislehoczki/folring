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

var LoginModal = function (_Component) {
    _inherits(LoginModal, _Component);

    function LoginModal(props) {
        _classCallCheck(this, LoginModal);

        var _this = _possibleConstructorReturn(this, (LoginModal.__proto__ || Object.getPrototypeOf(LoginModal)).call(this, props));

        _this.state = {
            password: null,
            email: '',
            userMessage: null
        };
        return _this;
    }

    _createClass(LoginModal, [{
        key: 'changeEmail',
        value: function changeEmail(e) {
            this.setState({ email: e.target.value });
        }
    }, {
        key: 'changePassword',
        value: function changePassword(e) {
            this.setState({ password: e.target.value });
        }
    }, {
        key: 'checkEmail',
        value: function checkEmail() {
            // email
            var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

            var emailTest = this.state.email.match(emailRegex);
            if (!emailTest) {
                this.setState({ userMessage: "Invalid email" });
            } else {
                this.setState({ userMessage: null });
            }
            return emailTest;
        }
    }, {
        key: 'checkPassword',
        value: function checkPassword() {
            if (this.state.password) {
                this.setState({ userMessage: null });
                return true;
            } else {
                this.setState({ userMessage: "No password" });
                return false;
            }
        }
    }, {
        key: 'signinUser',
        value: function signinUser() {
            console.log('LOG IN FROM HERE');
            this.props.loginUser({ email: this.state.email, password: this.state.password });
        }
    }, {
        key: 'render',
        value: function render() {
            var errorStyle = {
                fontSize: '16px', color: '#E74476'
            };

            return _react2.default.createElement(
                'div',
                { id: 'local-login' },
                _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            null,
                            'Email'
                        ),
                        _react2.default.createElement('input', { onChange: this.changeEmail.bind(this), type: 'email', placeholder: 'email', autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Password'
                        ),
                        _react2.default.createElement('input', { onChange: this.changePassword.bind(this), placeholder: 'password', type: 'password', autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.signinUser.bind(this) },
                            'Login'
                        ),
                        this.state.userMessage ? _react2.default.createElement(
                            'p',
                            { style: errorStyle },
                            ' ',
                            this.state.userMessage,
                            ' '
                        ) : null
                    )
                )
            );
        }
    }]);

    return LoginModal;
}(_react.Component);

exports.default = LoginModal;