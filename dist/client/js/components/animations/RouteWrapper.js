'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// function that takes children as argument
var Transition = function Transition(_ref) {
  var children = _ref.children;


  var willLeave = function willLeave() {
    return {
      opacity: (0, _reactMotion.spring)(0)
    };
  };

  var willEnter = function willEnter() {
    return {
      opacity: 0
    };
  };

  var getStyles = function getStyles() {
    return {
      opacity: (0, _reactMotion.spring)(1)
    };
  };

  return _react2.default.createElement(
    _reactMotion.TransitionMotion,
    { styles: children ? [{ key: 'key', style: getStyles(), data: children }] : [], willLeave: willLeave, willEnter: willEnter },
    function (int) {
      return _react2.default.createElement(
        'div',
        null,
        int.map(function (_ref2) {
          var _ref3;

          var key = _ref2.key,
              style = _ref2.style,
              data = _ref2.data;
          return _react2.default.createElement(
            'div',
            { key: key + '-transition', style: (_ref3 = { transform: 'rotate(' + style.transform + 'deg)', left: style.left, opacity: style.opacity, position: 'absolute' }, _defineProperty(_ref3, 'left', 0), _defineProperty(_ref3, 'top', 0), _defineProperty(_ref3, 'width', '100%'), _defineProperty(_ref3, 'height', '100%'), _ref3) },
            data
          );
        })
      );
    }
  );
};

exports.default = Transition;