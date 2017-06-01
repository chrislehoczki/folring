"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// The component
var Piece = function (_React$Component) {
  _inherits(Piece, _React$Component);

  function Piece() {
    _classCallCheck(this, Piece);

    return _possibleConstructorReturn(this, (Piece.__proto__ || Object.getPrototypeOf(Piece)).apply(this, arguments));
  }

  _createClass(Piece, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.props.handleClick(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      var className = void 0;
      switch (this.props.status) {
        case 0:
          className = "piece empty";
          break;
        case 10:
          className = "piece black";
          break;
        case 11:
          className = "piece black selected";
          break;
        case 20:
          className = "piece white";
          break;
        case 21:
          className = "piece white selected";
          break;
      }

      var idName = "p" + this.props.index;
      return _react2.default.createElement("div", { id: idName, className: className, onClick: this.handleClick.bind(this) });
    }
  }]);

  return Piece;
}(_react2.default.Component);

exports.default = Piece;